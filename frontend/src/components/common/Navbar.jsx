import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  LogOut,
  Menu,
  X,
  Bookmark,
  FileText,
  Home,
} from "lucide-react";

const Navbar = ({ currentUser, onLogout, onNavigate }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavigation = (page) => {
    onNavigate(page);
    setShowMobileMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavigation("home")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/50 transform group-hover:scale-110 transition-transform">
                <Briefcase className="text-white" size={24} />
              </div>
            </div>
            <span className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
              JobPortal
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink onClick={() => handleNavigation("home")} icon={Home}>
              Home
            </NavLink>

            <NavLink onClick={() => handleNavigation("jobs")} icon={Briefcase}>
              Jobs
            </NavLink>

            {currentUser ? (
              <>
                <NavLink
                  onClick={() => handleNavigation("saved")}
                  icon={Bookmark}
                >
                  Saved
                </NavLink>

                <NavLink
                  onClick={() => handleNavigation("applications")}
                  icon={FileText}
                >
                  Applications
                </NavLink>

                {currentUser.role === "employer" && (
                  <button
                    onClick={() => handleNavigation("post-job")}
                    className="ml-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold transition-all hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 flex items-center gap-2 btn-shine"
                  >
                    <Plus size={18} />
                    Post Job
                  </button>
                )}

                {/* User Profile */}
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
                  <div className="relative group/avatar">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur opacity-75 group-hover/avatar:opacity-100 transition-opacity"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-black shadow-xl">
                      {currentUser.name[0].toUpperCase()}
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <div className="text-white font-bold text-sm">
                      {currentUser.name}
                    </div>
                    <div className="text-gray-400 text-xs capitalize">
                      {currentUser.role}
                    </div>
                  </div>

                  <button
                    onClick={onLogout}
                    className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-xl"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <button
                  onClick={() => handleNavigation("login")}
                  className="px-6 py-3 glass border border-white/10 text-white rounded-xl font-semibold hover:border-white/20 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("register")}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:scale-105 btn-shine"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white p-3 glass border border-white/10 rounded-xl transition-all"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-6 border-t border-white/10 animate-fadeIn">
            <div className="space-y-2">
              <MobileNavLink
                onClick={() => handleNavigation("home")}
                icon={Home}
              >
                Home
              </MobileNavLink>

              <MobileNavLink
                onClick={() => handleNavigation("jobs")}
                icon={Briefcase}
              >
                Jobs
              </MobileNavLink>

              {currentUser ? (
                <>
                  <MobileNavLink
                    onClick={() => handleNavigation("saved")}
                    icon={Bookmark}
                  >
                    Saved Jobs
                  </MobileNavLink>

                  <MobileNavLink
                    onClick={() => handleNavigation("applications")}
                    icon={FileText}
                  >
                    Applications
                  </MobileNavLink>

                  {currentUser.role === "employer" && (
                    <button
                      onClick={() => handleNavigation("post-job")}
                      className="flex items-center gap-3 w-full text-left px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold mt-2"
                    >
                      <Plus size={20} />
                      Post Job
                    </button>
                  )}

                  <div className="my-4 border-t border-white/10"></div>

                  <div className="px-5 py-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-black shadow-xl">
                      {currentUser.name[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-bold">
                        {currentUser.name}
                      </div>
                      <div className="text-gray-400 text-sm capitalize">
                        {currentUser.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full text-left px-5 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-semibold"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation("login")}
                    className="w-full text-left px-5 py-3 glass border border-white/10 text-white rounded-xl font-semibold"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("register")}
                    className="w-full text-left px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold mt-2"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Helper Components
const NavLink = ({ onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className="px-5 py-3 text-gray-300 hover:text-white transition-all font-semibold rounded-xl hover:bg-white/5 flex items-center gap-2 group"
  >
    <Icon size={18} className="group-hover:scale-110 transition-transform" />
    {children}
  </button>
);

const MobileNavLink = ({ onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full text-left px-5 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-semibold"
  >
    <Icon size={20} />
    {children}
  </button>
);

export default Navbar;
