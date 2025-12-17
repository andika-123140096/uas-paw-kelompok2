import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Landing from './pages/Landing'
import JobsList from './pages/JobsList'
import JobDetail from './pages/JobDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateJob from './pages/CreateJob'
import Profile from './pages/Profile'
import MyApplications from './pages/MyApplications'
import Applicants from './pages/Applicants'
import MyJobs from './pages/MyJobs'
import EditJob from './pages/EditJob'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />

            {/* Auth routes - redirect to jobs if already logged in */}
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/register" element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            } />

            {/* Protected routes - require authentication */}
            <Route path="/create-job" element={
              <ProtectedRoute requireRole="employer">
                <CreateJob />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute requireRole="job_seeker">
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/my-jobs" element={
              <ProtectedRoute requireRole="employer">
                <MyJobs />
              </ProtectedRoute>
            } />
            <Route path="/jobs/:id/edit" element={
              <ProtectedRoute requireRole="employer">
                <EditJob />
              </ProtectedRoute>
            } />
            <Route path="/my-applications" element={
              <ProtectedRoute requireRole="job_seeker">
                <MyApplications />
              </ProtectedRoute>
            } />
            <Route path="/jobs/:job_id/applicants" element={
              <ProtectedRoute requireRole="employer">
                <Applicants />
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
