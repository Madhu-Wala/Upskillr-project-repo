import { Rocket, BarChart3, Brain, Award, Users, Smartphone } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Bite-Sized Lessons",
      description: "Learn in short, focused sessions that fit your busy schedule. Each lesson is designed to be completed in 10-15 minutes.",
      icon: <Rocket className="w-6 h-6 text-white" />,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Real-Time Progress",
      description: "Track your learning journey with detailed analytics, completion rates, and personalized insights to keep you motivated.",
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      gradient: "from-fuchsia-500 to-pink-500"
    },
    {
      title: "Adaptive Learning",
      description: "Our AI-powered system adapts to your pace and learning style, providing personalized recommendations and challenges.",
      icon: <Brain className="w-6 h-6 text-white" />,
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Industry Certificates",
      description: "Earn recognized certificates upon course completion to showcase your skills and boost your career prospects.",
      icon: <Award className="w-6 h-6 text-white" />,
      gradient: "from-indigo-600 to-indigo-400"
    },
    {
      title: "Community Support",
      description: "Connect with fellow learners, share knowledge, and get help from our vibrant community of professionals.",
      icon: <Users className="w-6 h-6 text-white" />,
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "Learn Anywhere",
      description: "Access your courses on any device - desktop, tablet, or mobile. Your progress syncs seamlessly across all platforms.",
      icon: <Smartphone className="w-6 h-6 text-white" />,
      gradient: "from-fuchsia-400 to-indigo-500"
    }
  ];

  return (
    <section id='features' className="bg-[#f8faff] py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
          Why Choose UpSkillr
        </span>
        
        {/* Heading */}
        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Everything You Need to Succeed
        </h2>
        
        {/* Subheading */}
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          Powerful features designed to accelerate your learning journey
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Icon Container */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8 shadow-lg shadow-indigo-100`}>
              {feature.icon}
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;