import React, { useState } from "react";
import { Mail, Lock, User as UserIcon } from "lucide-react";

const RegisterPage = ({ onRegister, onNavigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email, password, role);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-20 px-4">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative max-w-md w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity"></div>

          <div className="relative glass rounded-3xl p-10 border border-white/10">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-white mb-2">
                Create Account
              </h2>
              <p className="text-gray-400">Join our community today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass border border-white/10 text-white rounded-xl focus:border-purple-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass border border-white/10 text-white rounded-xl focus:border-purple-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass border border-white/10 text-white rounded-xl focus:border-purple-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Minimum 6 characters
                </p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-3">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`relative cursor-pointer ${
                      role === "seeker" ? "scale-105" : ""
                    } transition-transform`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="seeker"
                      checked={role === "seeker"}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`px-4 py-4 glass rounded-xl border ${
                        role === "seeker"
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10"
                      } transition-all flex items-center justify-center gap-2 font-bold`}
                    >
                      <UserIcon size={18} />
                      Job Seeker
                    </div>
                  </label>

                  <label
                    className={`relative cursor-pointer ${
                      role === "employer" ? "scale-105" : ""
                    } transition-transform`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={role === "employer"}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`px-4 py-4 glass rounded-xl border ${
                        role === "employer"
                          ? "border-pink-500 bg-pink-500/10"
                          : "border-white/10"
                      } transition-all flex items-center justify-center gap-2 font-bold`}
                    >
                      <UserIcon size={18} />
                      Employer
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 btn-shine"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-gray-400 mt-8">
              Already have an account?{" "}
              <button
                onClick={() => onNavigate("login")}
                className="text-purple-400 hover:text-purple-300 font-bold transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
