import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here (e.g., Firebase, Auth0, or custom API)
    console.log("Reset link sent to:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <GraduationCap size={28} />
          </div>
        </div>
        
        <h2 className="text-center text-3xl font-black text-gray-900 tracking-tight">
          Forgot password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] border border-gray-100">
          
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                    placeholder="sarah@example.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-100 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Check your email</h3>
              <p className="text-sm text-gray-500 font-medium mb-8">
                We've sent a password reset link to <br />
                <span className="text-indigo-600 font-bold">{email}</span>
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-indigo-600 font-bold text-sm hover:text-indigo-500"
              >
                Didn't receive the email? Click to resend
              </button>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;