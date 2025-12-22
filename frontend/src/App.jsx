import Login from "./components/Login";
import Signup from "./components/Signup";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./components/Landing";
import LearnerDashboard from "./components/Learner/LearnerDashboard";
import InstructorDashboard from "./components/Instructor/InstructorDashboard";
import LearnerCourses from "./components/Learner/LearnerCourses";
import LearnerLayout from "./components/Learner/LearnerLayout";
import InstructorLayout from "./components/Instructor/InstructorLayout";
import Browse from "./components/Learner/Browse";
import MyCourses from "./components/Instructor/MyCourses";
import CourseCreateWizard from "./components/Instructor/CourseCreate/CourseCreateWizard";

function App() {
  
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Learner" element={<LearnerLayout />} >
          <Route index element={<LearnerDashboard />} />
          {/* Nested routes can be added here if needed */}
          <Route path="my-courses" element={<LearnerCourses />} />
          <Route path="browse-courses" element={<Browse />} />
        </Route>
        <Route path="/Instructor" element={<InstructorLayout />} >
          <Route index element={<InstructorDashboard />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="create-course" element={<CourseCreateWizard />} />
          

          {/* Nested routes can be added here if needed */}
        </Route>
      </Routes>
    </BrowserRouter>
    
  </>
  )
}

export default App
