import { Outlet } from "react-router-dom";
import NavLearner from "./NavLearner";
function LearnerLayout() {
    return (
        <div className="learner-layout">
            <NavLearner/>
            <Outlet />
        </div>
    );
}

export default LearnerLayout;