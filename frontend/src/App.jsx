import { BrowserRouter, Route, Routes } from "react-router-dom";

// Auth & Landing
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";

// Learner Components
import LearnerLayout from "./components/Learner/LearnerLayout";
import LearnerDashboard from "./components/Learner/LearnerDashboard";
import LearnerCourses from "./components/Learner/LearnerCourses";
import Browse from "./components/Learner/Browse";
import CoursePlayer from "./components/Learner/CoursePlayer";
import QuizPlayer from "./components/Learner/QuizPlayer";

// Instructor Components
import InstructorDashboard from "./components/Instructor/InstructorDashboard";
import MyCourses from "./components/Instructor/MyCourses";
import CourseCreateWizard from "./components/Instructor/CourseCreate/CourseCreateWizard";
import InstructorStats from "./components/Instructor/InstructorStats"; 
import StudentList from "./components/Instructor/StudentList";
import InstructorProfile from "./components/Instructor/InstructorProfile";
import Reviews from "./components/Instructor/Reviews";

//  Import the Notifications component
import Notifications from "./components/Instructor/Notifications";

function App() {

  //dummy data for using quiz display component
  const dummyQuiz = {
    _id: "quiz_js_patterns_001",
    courseId: "course_js_adv_101",
    lessonId: "L1",
    totalMarks: 100,
    questions: ["q1", "q2", "q3"], // References to the questions below
    createdAt: new Date(),
};

const dummyQuestions = [
    {
        _id: "q1",
        quizId: "quiz_js_patterns_001",
        questionText: "Which of the following is a primary benefit of using the Module Pattern in JavaScript?",
        options: [
            { optionText: "It speeds up the execution of the code.", isCorrect: false },
            { optionText: "It allows for private state and encapsulation.", isCorrect: true },
            { optionText: "It automatically optimizes memory usage.", isCorrect: false },
            { optionText: "It makes the code compatible with Internet Explorer 6.", isCorrect: false }
        ],
        explanation: "The Module Pattern uses closures to create private scopes, allowing you to hide variables and functions from the global scope.",
    },
    {
        _id: "q2",
        quizId: "quiz_js_patterns_001",
        questionText: "Observe the following logic flow. What pattern is being illustrated in this diagram?",
        diagramURL: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=600&auto=format&fit=crop", // Diagram example
        options: [
            { optionText: "Singleton Pattern", isCorrect: false },
            { optionText: "Observer Pattern", isCorrect: true },
            { optionText: "Factory Pattern", isCorrect: false },
            { optionText: "Prototype Pattern", isCorrect: false }
        ],
        explanation: "The diagram shows a 'Subject' notifying multiple 'Observers' of a state change, which is the core of the Observer Pattern.",
    },
    {
        _id: "q3",
        quizId: "quiz_js_patterns_001",
        questionText: "In the context of Closures, where does a function look first for a variable?",
        options: [
            { optionText: "The Global Scope", isCorrect: false },
            { optionText: "The Parent Function Scope", isCorrect: false },
            { optionText: "Its own Local Scope", isCorrect: true },
            { optionText: "The prototype chain", isCorrect: false }
        ],
        explanation: "JavaScript uses lexical scoping; a function first looks at its own local scope before moving up to the outer/parent scopes.",
    }
];
  
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* LEARNER ROUTES */}
        <Route path="/Learner" element={<LearnerLayout />} >
          <Route index element={<LearnerDashboard />} />
          <Route path="my-courses" element={<LearnerCourses />} />
          <Route path="browse-courses" element={<Browse />} />
          <Route path="course-dummy" element={<CoursePlayer />} />
          <Route path="quiz-dummy" element={<QuizPlayer 
            quiz={dummyQuiz} 
            questions={dummyQuestions} 
            onComplete={() => setShowQuiz(false)} 
          />} />
        </Route>

        {/* INSTRUCTOR DASHBOARD ROUTES */}
        <Route path="/Instructor" element={<InstructorDashboard />} >
          {/* Default Home Page (Stats) */}
          <Route index element={<InstructorStats />} />
          
          {/* Core Features */}
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students" element={<StudentList />} />
          <Route path="reviews" element={<Reviews />} />
          
          {/* Settings & Extras */}
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<InstructorProfile />} />
        </Route>

        {/* COURSE WIZARD (Standalone Page) */}
        <Route path="/Instructor/create-course" element={<CourseCreateWizard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;