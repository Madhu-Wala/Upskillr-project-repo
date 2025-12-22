import { Outlet } from "react-router-dom";

function LearnerLayout() {
    return (
        <div className="learner-layout">
            <Outlet />
        </div>
    );
}

export default LearnerLayout;