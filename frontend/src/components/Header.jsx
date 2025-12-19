import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated, isEmployer, isJobSeeker } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="font-bold text-2xl md:text-3xl tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">JobPortal</Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/jobs" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Jobs</Link>
            {isAuthenticated && isJobSeeker && <Link to="/my-applications" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Applications</Link>}
            {isEmployer && <Link to="/my-jobs" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Jobs</Link>}
            {isEmployer && <Link to="/create-job" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Create Job</Link>}
            {isJobSeeker && <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profile</Link>}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <button onClick={handleLogout} className="hidden md:flex text-sm px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Logout</button>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link to="/login" className="text-sm px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Login</Link>
              <Link to="/register" className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">Register</Link>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4 space-y-4">
            <Link to="/jobs" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Jobs</Link>
            {isAuthenticated && isJobSeeker && <Link to="/my-applications" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Applications</Link>}
            {isEmployer && <Link to="/my-jobs" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Jobs</Link>}
            {isEmployer && <Link to="/create-job" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Create Job</Link>}
            {isJobSeeker && <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profile</Link>}
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setIsOpen(false) }} className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Logout</button>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block text-blue-600 hover:text-blue-700 transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
