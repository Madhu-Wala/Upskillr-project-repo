import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import axios from 'axios';
import { set } from 'mongoose';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav=useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true);
    setError("");
    // Handle login logic here
    try {
      // 1. Send request to your backend controller login route
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // 2. Extract user data and token from backend response
      const { token, role, name } = response.data;

      // 3. Store Token and User Info in LocalStorage (or Cookies)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ name, role }));

      // 4. Role-based Redirection
      // if (role === 'admin') {
      //   nav('/admin-dashboard');
      // } 
     if (role === 'instructor') {
        nav('/Instructor');
      } else {
        nav('/Learner');
      }

    } catch (err) {
      // Handle errors from the backend (401, 400, etc.)
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-200 rounded-full blur-xl opacity-60 animate-pulse" />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-[20%] left-[10%] w-32 h-32 bg-green-200 rounded-full blur-2xl opacity-50" />
      <div className="absolute top-[20%] right-[-2%] w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-60" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6 py-10 bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/20 mx-4 mt-10 mb-10">
        
        {/* Header / Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-4">
            {/* Dummy Image Placeholder */}
            <img 
              src="https://via.placeholder.com/40" 
              alt="Logo" 
              className="w-10 h-10 object-contain brightness-0 invert" 
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Upskillr</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Show Error Message if it exists */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 animate-shake">
              {error}
            </div>
          )}
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <input
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required disabled={loading}
                placeholder="Enter your email"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400 text-gray-700"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required disabled={loading}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400 text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Forgot your password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit" disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">
              or continue with
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors active:scale-[0.98]"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="w-5 h-5" 
            />
            Continue with Google
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-600 font-bold hover:underline decoration-2 underline-offset-4">
              Sign up
            </a>
          </p>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={()=>nav("/")}
            className="px-5 py-2.5 w-20 cursor-pointer !mt-4 text-[15px] font-medium bg-indigo-600 hover:bg-indigo-800 text-white rounded-md"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;