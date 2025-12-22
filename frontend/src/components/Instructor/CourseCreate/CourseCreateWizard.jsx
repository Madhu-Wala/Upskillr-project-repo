import { useState } from 'react';
import { GraduationCap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Step1Basic from './Step1Basic';
import Step2Thumbnail from './Step2Thumbnail';
import Step3Curriculum from './Step3Curriculum';
import Step4Publish from './Step4Publish';

const CourseCreateWizard = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Thumbnail" },
    { id: 3, title: "Add Lessons" },
    { id: 4, title: "Preview & Publish" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* 1. HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-xl text-gray-900">UpSkillr</span>
            </div>
            <div className="h-6 w-px bg-gray-200"></div>
            <h2 className="text-lg font-medium text-gray-600">Create New Course</h2>
          </div>
          <div className="flex items-center gap-8">
            <button className="text-gray-500 hover:text-gray-900 font-bold text-sm flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-300"></div>Save Draft</button>
            <Link to="/Instructor/my-courses" className="text-gray-500 hover:text-red-600 font-bold text-sm">Exit</Link>
          </div>
        </div>
      </header>

      {/* 2. STEPPER */}
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex items-center justify-between relative px-10">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-3 bg-gray-50 px-4 z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 
                ${activeStep > step.id ? "bg-emerald-500 text-white" : activeStep === step.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-gray-200 text-gray-500"}`}>
                {activeStep > step.id ? <Check size={16}/> : step.id}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wide ${activeStep === step.id ? "text-indigo-600" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ACTIVE STEP CONTENT */}
      <main className="px-6">
        {activeStep === 1 && <Step1Basic onNext={() => setActiveStep(2)} />}
        {activeStep === 2 && <Step2Thumbnail onNext={() => setActiveStep(3)} onBack={() => setActiveStep(1)} />}
        {activeStep === 3 && <Step3Curriculum onNext={() => setActiveStep(4)} onBack={() => setActiveStep(2)} />}
        {activeStep === 4 && <Step4Publish onBack={() => setActiveStep(3)} />}
      </main>

    </div>
  );
};

export default CourseCreateWizard;