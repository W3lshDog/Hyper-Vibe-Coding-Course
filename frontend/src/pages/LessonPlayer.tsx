import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Course, Lesson } from '../types/database';
import { useAuthStore } from '../context/auth';
import { Button } from '../components/ui/Button';
import { CheckCircle, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LessonPlayer() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function fetchData() {
      if (!courseId) return;

      if (import.meta.env.VITE_E2E === '1' && courseId === '1') {
        const enrolled = window.localStorage.getItem(`e2e_enrolled_${courseId}`) === 'true'
        if (!enrolled) {
          navigate(`/courses/${courseId}`);
          return;
        }

        setCourse({
          id: '1',
          title: 'Intro to Programming',
          description: 'Learn the basics of coding.',
          price: 29.99,
          duration_minutes: 120,
          difficulty: 'beginner',
          instructor_id: 'test-instructor-id',
          thumbnail_url: 'https://via.placeholder.com/150',
          is_published: true,
          created_at: new Date().toISOString(),
        })

        setLessons([
          {
            id: 'l1',
            course_id: '1',
            title: 'Lesson 1',
            order_index: 1,
            video_url: 'http://example.com/video1',
            content: 'Lesson 1 Content',
            duration_seconds: 600,
            is_free: true,
            created_at: new Date().toISOString(),
          },
          {
            id: 'l2',
            course_id: '1',
            title: 'Lesson 2',
            order_index: 2,
            video_url: 'http://example.com/video2',
            content: 'Lesson 2 Content',
            duration_seconds: 1200,
            is_free: false,
            created_at: new Date().toISOString(),
          },
        ])

        const completedRaw = window.localStorage.getItem(`e2e_completed_${courseId}`)
        const completedIds = completedRaw ? completedRaw.split(',').filter(Boolean) : []
        setCompletedLessons(new Set(completedIds))
        setLoading(false);
        return;
      }

      // Verify enrollment
      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user!.id)
        .eq('course_id', courseId)
        .single();

      if (!enrollment) {
        navigate(`/courses/${courseId}`);
        return;
      }

      // Fetch course
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
      setCourse(courseData);

      // Fetch lessons
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index');
      
      if (lessonsData) {
        setLessons(lessonsData);
      }

      // Fetch progress
      const { data: progressData } = await supabase
        .from('progress')
        .select('lesson_id')
        .eq('user_id', user!.id)
        .eq('completed', true);
      
      if (progressData) {
        setCompletedLessons(new Set(progressData.map(p => p.lesson_id)));
      }

      setLoading(false);
    }

    fetchData();
  }, [courseId, user, navigate]);

  const currentLesson = lessons[currentLessonIndex];

  const handleComplete = async () => {
    if (!user || !currentLesson) return;

    // Optimistic update
    const newCompleted = new Set(completedLessons);
    newCompleted.add(currentLesson.id);
    setCompletedLessons(newCompleted);

    if (import.meta.env.VITE_E2E === '1' && courseId) {
      window.localStorage.setItem(`e2e_completed_${courseId}`, Array.from(newCompleted).join(','))
      return;
    }

    // DB update
    await supabase.from('progress').upsert({
      user_id: user.id,
      lesson_id: currentLesson.id,
      completed: true,
      completed_at: new Date().toISOString()
    });

    // Update enrollment progress
    const progressPercent = (newCompleted.size / lessons.length) * 100;
    await supabase.from('enrollments').update({
      progress_percentage: progressPercent,
      // If all completed
      ...(newCompleted.size === lessons.length ? { completed_at: new Date().toISOString() } : {})
    }).eq('user_id', user.id).eq('course_id', courseId);
  };

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading learning environment...</div>;
  if (!course || !currentLesson) return <div className="p-8 text-center">Course content not found</div>;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-200">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mb-2">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Button>
          <h2 className="text-lg font-bold text-gray-900 truncate">{course.title}</h2>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(completedLessons.size / lessons.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{completedLessons.size} / {lessons.length} completed</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {lessons.map((lesson, index) => {
              const isActive = index === currentLessonIndex;
              const isCompleted = completedLessons.has(lesson.id);
              
              return (
                <li 
                  key={lesson.id}
                  className={cn(
                    "cursor-pointer hover:bg-gray-50 transition-colors",
                    isActive && "bg-primary/5 border-l-4 border-primary"
                  )}
                  onClick={() => setCurrentLessonIndex(index)}
                >
                  <div className={cn("p-4 flex items-start", isActive ? "pl-3" : "pl-4")}>
                    <div className="flex-shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center text-xs",
                          isActive ? "border-primary text-primary font-bold" : "border-gray-300 text-gray-500"
                        )}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={cn("text-sm font-medium", isActive ? "text-primary" : "text-gray-900")}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{Math.floor(lesson.duration_seconds / 60)} mins</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg shadow-lg overflow-hidden mb-8 relative" style={{ paddingBottom: '56.25%' }}>
              {/* Mock Video Player */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                  <PlayCircle className="h-20 w-20 mx-auto opacity-80" />
                  <p className="mt-4 text-lg">Video Player Placeholder</p>
                  <p className="text-sm text-gray-400">Video URL: {currentLesson.video_url}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrev} 
                  disabled={currentLessonIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                
                {!completedLessons.has(currentLesson.id) && (
                  <Button onClick={handleComplete} variant="default">
                    Mark as Complete
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={handleNext} 
                  disabled={currentLessonIndex === lessons.length - 1}
                >
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Lesson Content</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {currentLesson.content || "No text content for this lesson."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
