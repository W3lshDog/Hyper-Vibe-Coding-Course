import { test, expect } from '@playwright/test';

test.describe('Enrollment & Learning', () => {
  const user = {
    id: 'test-user-id',
    email: 'test@example.com',
    fullName: 'Test User',
  };

  const course = {
    id: '1',
    title: 'Intro to Programming',
    description: 'Learn the basics of coding.',
    price: 29.99,
    duration_minutes: 120,
    difficulty: 'beginner',
    thumbnail_url: 'https://via.placeholder.com/150',
    is_published: true,
  };

  const lessons = [
    { id: 'l1', title: 'Lesson 1', duration_seconds: 600, is_free: true, order_index: 1, video_url: 'http://example.com/video1', content: 'Lesson 1 Content' },
    { id: 'l2', title: 'Lesson 2', duration_seconds: 1200, is_free: false, order_index: 2, video_url: 'http://example.com/video2', content: 'Lesson 2 Content' },
  ];

  // Shared state for enrollment status across the test duration
  let isEnrolled = false;

  test.beforeEach(async ({ page }) => {
    // Reset state
    isEnrolled = false;
    
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Master route handler for all Supabase requests
    await page.route('**', async (route) => {
        const url = route.request().url();
        const method = route.request().method();
        
        // --- Auth Mocks ---
        if (url.includes('/auth/v1/user')) {
             await route.fulfill({
                status: 200,
                body: JSON.stringify({
                  id: user.id,
                  aud: 'authenticated',
                  role: 'authenticated',
                  email: user.email,
                  user_metadata: { full_name: user.fullName },
                }),
              });
              return;
        }

        if (url.includes('/auth/v1/token')) {
             await route.fulfill({
                status: 200,
                body: JSON.stringify({
                  access_token: 'fake-jwt-token',
                  token_type: 'bearer',
                  expires_in: 3600,
                  refresh_token: 'fake-refresh-token',
                  user: {
                    id: user.id,
                    aud: 'authenticated',
                    role: 'authenticated',
                    email: user.email,
                    user_metadata: { full_name: user.fullName },
                  },
                }),
              });
              return;
        }

        // --- Database Mocks ---

        if (url.includes('/rest/v1/users')) {
             await route.fulfill({
                status: 200,
                body: JSON.stringify({
                  id: user.id,
                  email: user.email,
                  full_name: user.fullName,
                  role: 'student',
                  created_at: new Date().toISOString(),
                }),
              });
              return;
        }

        if (url.includes('/rest/v1/courses')) {
             if (url.includes('id=eq.')) {
                 // Single course
                 await route.fulfill({ status: 200, body: JSON.stringify(course) });
             } else {
                 // List
                 await route.fulfill({ status: 200, body: JSON.stringify([course]) });
             }
             return;
        }

        if (url.includes('/rest/v1/lessons')) {
             await route.fulfill({ status: 200, body: JSON.stringify(lessons) });
             return;
        }

        // --- Dynamic Enrollment Mock ---
        if (url.includes('/rest/v1/enrollments')) {
             if (method === 'POST') {
                 // Simulate successful enrollment
                 isEnrolled = true;
                 await route.fulfill({
                    status: 201,
                    body: JSON.stringify([{ id: 'enrollment-1', user_id: user.id, course_id: course.id, progress_percentage: 0 }]),
                });
             } else if (method === 'PATCH') {
                 await route.fulfill({
                    status: 200,
                    body: JSON.stringify([{ id: 'enrollment-1', progress_percentage: 50 }]),
                });
             } else {
                 // GET
                 if (url.includes('course_id=eq.')) {
                     if (isEnrolled) {
                         await route.fulfill({ 
                             status: 200, 
                             body: JSON.stringify({ id: 'enrollment-1', user_id: user.id, course_id: course.id, progress_percentage: 0 }) 
                         });
                     } else {
                         // Return null (Supabase .single() returns null data or error if not found, 
                         // but typically empty array if .select() without .single(), 
                         // or explicit null if .single() and handled by client. 
                         // The client uses .single(), so supabase-js expects { data: null } or error?
                         // Actually, supabase returns { data: null, error: { code: 'PGRST116', ... } } for .single() if no rows.
                         // But if we just return empty array [] for a .select(), .single() might complain?
                         // Let's check the client code: 
                         // const { data: enrollment } = await supabase...single();
                         // If we return [], single() might fail.
                         // However, simplest mock is often [] if no single found, or null.
                         // Let's return null body which represents "no content" or empty array.
                         // If we return [], .single() throws error.
                         // If we return null, .single() returns null.
                         await route.fulfill({ status: 200, body: 'null' });
                     }
                 } else {
                     await route.fulfill({ status: 200, body: JSON.stringify([]) });
                 }
             }
             return;
        }

        if (url.includes('/rest/v1/progress')) {
             if (method === 'POST' || method === 'PATCH') {
                 await route.fulfill({
                    status: 201,
                    body: JSON.stringify([{ id: 'progress-1', lesson_id: lessons[0].id, completed: true }]),
                });
             } else {
                 await route.fulfill({ status: 200, body: JSON.stringify([]) });
             }
             return;
        }

        await route.continue();
    });
    
    // Perform login
    await page.goto('/login');
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should enroll in a course and complete a lesson', async ({ page }) => {
    // Navigate to catalog
    await page.goto('/courses');
    
    // Wait for courses to load
    await expect(page.locator('text=Loading courses...')).not.toBeVisible();
    
    // Check if empty state is shown (debugging)
    if (await page.locator('text=No courses available').isVisible()) {
        console.log('Courses list is empty');
    }

    // Click first course "View Course" button
    // We target the specific button/link within the first card
    // Relaxed selector
    await page.getByText('View Course').first().click();
    
    // Wait for detail page
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText(course.title);
    
    // Handle confirm dialog for payment mock
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    // Verify "Enroll" button is present (since isEnrolled is false initially)
    const enrollButton = page.locator('button:has-text("Enroll")');
    await expect(enrollButton).toBeVisible();

    // Click Enroll
    // This triggers POST /enrollments (handled by mock, sets isEnrolled=true)
    // Then navigates to /learn/:id
    await enrollButton.click();
    
    // Should navigate to learning page
    await expect(page).toHaveURL(/\/learn\//);
    
    // Verify lesson player loaded
    // This implies GET /enrollments was called and returned the object (since isEnrolled=true)
    await expect(page.locator('text=Video Player Placeholder')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Lesson 1');

    // Click "Mark as Complete"
    await page.click('button:has-text("Mark as Complete")');
    
    // Verify checkmark appears in sidebar
    await expect(page.locator('.text-green-500').first()).toBeVisible();
    
    // Verify progress bar updated (visual check logic might be complex, just check existence)
    await expect(page.locator('p:has-text("1 / 2 completed")')).toBeVisible();
  });
});
