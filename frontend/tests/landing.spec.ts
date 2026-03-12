import { test, expect } from '@playwright/test';

test('landing page has correct title and buttons', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hyper Vibe Coding Course/);

  // Check for the "Get Started" button
  const getStartedBtn = page.getByRole('button', { name: /Get Started/i }).first();
  await expect(getStartedBtn).toBeVisible();

  // Check for the "View Courses" button
  const viewCoursesBtn = page.getByRole('button', { name: /View Courses/i }).first();
  await expect(viewCoursesBtn).toBeVisible();
});

test('can navigate to courses page', async ({ page }) => {
  await page.goto('/');
  
  // Click the "View Courses" button
  await page.getByRole('button', { name: /View Courses/i }).first().click();

  // Expect URL to contain "courses"
  await expect(page).toHaveURL(/.*courses/);
  
  // Expect header to be visible
  await expect(page.getByRole('heading', { name: /Course Catalog/i })).toBeVisible();
});
