import { useState, useEffect } from 'react';
import { GraduationCap, Loader2, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Step1Basic from './Step1Basic';
import Step2Thumbnail from './Step2Thumbnail';
import Step3Curriculum from './Step3Curriculum';
import Step4QuizCreation from './Step4QuizCreation';
import Step5Publish from './Step5Publish';
import API from '../../../api/axios.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CourseCreateWizard = ({ mode }) => {
  const navigate = useNavigate();
  const { urlCourseId } = useParams();
  const location = useLocation();

  const [activeStep, setActiveStep] = useState(location.state?.jumpToStep || 1);
  const [courseId, setCourseId] = useState(urlCourseId || null);
  const [loading, setLoading] = useState(!!urlCourseId);

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    thumbnail: '',
  });
  const [lessons, setLessons] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);

  // --- 1. EDIT MODE INITIAL FETCH ---
  useEffect(() => {
    if (urlCourseId && mode === 'edit') {
      const loadCourseForEditing = async () => {
        try {
          setLoading(true);
          const [courseRes, lessonsRes, quizzesRes] = await Promise.all([
            API.get(`/api/instructor/courses/${urlCourseId}`),
            API.get(`/api/instructor/courses/${urlCourseId}/lessons`),
            API.get(`/api/instructor/courses/${urlCourseId}/quizzes`)
          ]);
          setCourseData(courseRes.data.data);
          setLessons(lessonsRes.data.data);
          if (quizzesRes.data.success) {
            setAllQuizzes(quizzesRes.data.data);
          }
          if (lessonsRes.data.quizzes) setAllQuizzes(lessonsRes.data.quizzes);

          setCourseId(urlCourseId);
        } catch (err) {
          console.error("Failed to load course", err);
        } finally {
          setLoading(false);
        }
      };
      loadCourseForEditing();
    }
  }, [urlCourseId, mode]);

  const handleUpdateCourseData = (updates) => {
    setCourseData(prev => ({ ...prev, ...updates }));
  };

  const fetchLessons = async () => {
    try {
      const { data } = await API.get(`/api/instructor/courses/${courseId}/lessons`);
      setLessons(data.data);
    } catch (err) {
      console.error("Error fetching lessons", err);
    }
  };

  const handleQuizAdded = (newQuiz) => {
    setAllQuizzes(prev => {
      const exists = prev.findIndex(q => q.lessonId === newQuiz.lessonId);
      if (exists > -1) {
        const updated = [...prev];
        updated[exists] = newQuiz;
        return updated;
      }
      return [...prev, newQuiz];
    });
  };

  const onQuizDeleted = (lessonId) => {
    setAllQuizzes(prev => prev.filter(q => q.lessonId !== lessonId));
  };

  const handleStep4Completion = () => {
    setActiveStep(5);
  };

  const handleStepComplete = (data) => {
    if (data._id) {
      setCourseId(data._id);
    }
    setCourseData(prev => ({ ...prev, ...data }));

    if (activeStep === 1 && !window.location.pathname.includes('/edit-course/')) {
      navigate(`/Instructor/edit-course/${data._id}`, { replace: true });
    }
    setActiveStep(prev => prev + 1);
  };

  const handlePublish = async () => {
    try {
      await API.put(`/api/instructor/courses/${courseId}/publish`);
      alert("Course is now Live! 🚀");
      navigate('/Instructor/my-courses');
    } catch (err) {
      console.error("Publishing failed", err);
      alert("Failed to publish. Please check if all lessons have content.");
    }
  };

  const handleSave = async () => {
    try {
      alert("Draft Saved!");
      navigate('/Instructor/my-courses');
    } catch (err) {
      console.error("Error exiting", err);
    }
  };

  const handleExit = async () => {
    try {
      alert("Exiting Course Creation");
      navigate('/Instructor/my-courses');
    } catch (err) {
      console.error("Error exiting", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-gray-500 font-bold">Fetching Course Details...</p>
      </div>
    </div>
  );

  const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Thumbnail" },
    { id: 3, title: "Add Lessons" },
    { id: 4, title: "Create Quiz" },
    { id: 5, title: "Preview & Publish" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">

      {/* 1. HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:h-20 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-xl text-gray-900">UpSkillr</span>
            </div>
            
            {/* Hidden on very small screens, shown on md+ */}
            <div className="hidden md:block h-6 w-px bg-gray-200"></div>
            <h2 className="hidden md:block text-lg font-medium text-gray-600">Create New Course</h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto justify-end">
            <button
              onClick={handleSave}
              className="text-gray-500 hover:text-gray-900 font-bold text-sm flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <span className="hidden sm:inline">Save Draft</span>
              <span className="sm:hidden">Save</span>
            </button>
            <button
              onClick={handleExit}
              className="text-gray-500 hover:text-red-600 font-bold text-sm"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* 2. STEPPER */}
      <div className="max-w-4xl mx-auto py-6 md:py-12">
        {/* Horizontal Scroll Container for Mobile */}
        <div className="overflow-x-auto px-4 md:px-10 pb-4 no-scrollbar">
          <div className="flex items-center justify-between relative min-w-[500px] md:min-w-0">
            
            {/* Connecting Line (Hidden on small mobile to avoid mess, Visible on larger screens) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10 hidden md:block"></div>

            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-3 bg-gray-50 px-2 md:px-4 z-10 min-w-[80px]">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 
                  ${activeStep > step.id ? "bg-emerald-500 text-white" : activeStep === step.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-gray-200 text-gray-500"}`}
                >
                  {activeStep > step.id ? <Check size={16} /> : step.id}
                </div>
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wide text-center whitespace-nowrap ${activeStep === step.id ? "text-indigo-600" : "text-gray-400"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. ACTIVE STEP CONTENT */}
      <main className="px-4 md:px-6">
        {activeStep === 1 && (
          (mode === 'edit' && loading) ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={40} />
              <p className="text-gray-500 font-medium">Loading Course Details...</p>
            </div>
          ) : (
            <Step1Basic
              initialData={courseData}
              existingId={courseId}
              onUpdate={handleUpdateCourseData}
              onNext={handleStepComplete} 
            />
          )
        )}
        {activeStep === 2 && (
          <Step2Thumbnail
            courseId={courseId}
            initialThumbnail={courseData.thumbnail}
            onUpdate={(thumbnailData) => {
              setCourseData(prev => ({ ...prev, thumbnail: thumbnailData }));
            }}
            onNext={(thumbnailUrl) => {
              setCourseData((prev) => ({ ...prev, thumbnail: thumbnailUrl }));
              setActiveStep(3);
            }}
            onBack={() => setActiveStep(1)}
          />
        )}
        {activeStep === 3 && (
          <Step3Curriculum
            courseId={courseId}
            initialLessons={lessons}
            onNext={handleStepComplete}
            onBack={() => setActiveStep(2)}
          />
        )}
        {activeStep === 4 && (
          <Step4QuizCreation
            courseId={courseId}
            lessons={lessons}
            allQuizzes={allQuizzes}
            onQuizAdded={handleQuizAdded}
            onQuizDeleted={onQuizDeleted}
            onNext={handleStep4Completion}
            onRefresh={fetchLessons}
            onBack={() => setActiveStep(3)}
          />
        )}
        {activeStep === 5 && (
          <Step5Publish
            courseData={courseData}
            lessons={lessons}
            allQuizzes={allQuizzes}
            onBack={() => setActiveStep(4)}
            onPublish={handlePublish}
          />
        )}
      </main>

    </div>
  );
};

export default CourseCreateWizard;