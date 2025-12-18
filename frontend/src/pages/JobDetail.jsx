import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJob, applyToJob } from '../api'
import { useAuth } from '../components/AuthProvider'

export default function JobDetail(){
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [err, setErr] = useState(null)
  const [msg, setMsg] = useState(null)
  const [applying, setApplying] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, isJobSeeker } = useAuth()

  async function load(){
    try{ const data = await getJob(id); setJob(data); } catch(e){ setErr(e.error || 'Gagal memuat detail pekerjaan') }
  }

  useEffect(()=>{ load() }, [id])

  async function apply(){
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } })
      return
    }

    if (!isJobSeeker) {
      setErr('Hanya pencari kerja yang dapat melamar pekerjaan')
      return
    }

    setErr(null); setMsg(null); setApplying(true)
    try{
      const data = await applyToJob(Number(id))
      setMsg(data.message || 'Lamaran berhasil dikirim')
    }catch(e){
      setErr(e.error || 'Gagal mengirim lamaran')
    } finally {
      setApplying(false)
    }
  }

  if (!job) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Memuat detail pekerjaan...</p>
    </div>
  </div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 animate-slide-up">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                {job.salary ? `Rp ${job.salary.toLocaleString()}` : 'Gaji Kompetitif'}
              </span>
              <span className="flex items-center bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.type}
              </span>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Deskripsi Pekerjaan</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{job.description}</p>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Persyaratan</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{job.requirements}</p>
          </div>

          {err && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 animate-slide-up">
              {err}
            </div>
          )}

          {msg && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-6 animate-slide-up">
              {msg}
            </div>
          )}

          <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={apply}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105"
              disabled={applying}
            >
              {applying ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim Lamaran...
                </div>
              ) : (
                isAuthenticated ? 'Lamar Pekerjaan' : 'Login untuk Melamar'
              )}
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
