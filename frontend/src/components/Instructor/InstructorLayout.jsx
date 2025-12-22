import { Outlet } from "react-router-dom";
function InstructorLayout() {
    return (
        <div className="learner-layout">
            <Outlet />
        </div>
    );
}

export default InstructorLayout;