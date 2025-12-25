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

// Instructor Components
import InstructorDashboard from "./components/Instructor/InstructorDashboard";
import MyCourses from "./components/Instructor/MyCourses";
import CourseCreateWizard from "./components/Instructor/CourseCreate/CourseCreateWizard";
import InstructorStats from "./components/Instructor/InstructorStats"; 
import StudentList from "./components/Instructor/StudentList";
import InstructorProfile from "./components/Instructor/InstructorProfile";
import Earnings from "./components/Instructor/Earnings";
import Reviews from "./components/Instructor/Reviews";
import Messages from "./components/Instructor/Messages";
// 👇 Import the Notifications component
import Notifications from "./components/Instructor/Notifications";

function App() {
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
        </Route>

        {/* INSTRUCTOR DASHBOARD ROUTES */}
        <Route path="/Instructor" element={<InstructorDashboard />} >
          {/* Default Home Page (Stats) */}
          <Route index element={<InstructorStats />} />
          
          {/* Core Features */}
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students" element={<StudentList />} />
          <Route path="messages" element={<Messages />} />
          <Route path="earnings" element={<Earnings />} />
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