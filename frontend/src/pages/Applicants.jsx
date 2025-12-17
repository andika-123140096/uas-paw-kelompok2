import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getJobApplicants, updateApplicationStatus } from '../api'

export default function Applicants(){
  const { job_id } = useParams()
  const [apps, setApps] = useState([])
  const [err, setErr] = useState(null)

  async function load(){
    setErr(null)
    try{ const data = await getJobApplicants(job_id); setApps(data || []) } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  useEffect(()=>{ load() }, [job_id])

  async function setStatus(id, status){
    try{ await updateApplicationStatus(id, status); load() } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pelamar Lowongan</h1>
          <p className="text-gray-600 dark:text-gray-300">Kelola semua pelamar untuk lowongan kerja ini</p>
        </div>

        {err && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
            {err}
          </div>
        )}

        <div className="space-y-6">
          {apps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Belum ada pelamar</h3>
              <p className="text-gray-600 dark:text-gray-300">Lowongan kerja ini belum memiliki pelamar</p>
            </div>
          ) : (
            apps.map(a => {
              const getStatusColor = (status) => {
                switch (status?.toLowerCase()) {
                  case 'pending':
                    return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
                  case 'shortlisted':
                    return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800';
                  case 'accepted':
                    return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800';
                  case 'rejected':
                    return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800';
                  default:
                    return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-800';
                }
              };

              const getStatusIcon = (status) => {
                switch (status?.toLowerCase()) {
                  case 'pending':
                    return '⏳';
                  case 'shortlisted':
                    return '⭐';
                  case 'accepted':
                    return '✅';
                  case 'rejected':
                    return '❌';
                  default:
                    return '📄';
                }
              };

              return (
                <div key={a.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 mb-6 lg:mb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                            {(a.user?.name || a.applicant_name || 'U')[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {a.user?.name || a.applicant_name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(a.status)}`}>
                              <span className="mr-1">{getStatusIcon(a.status)}</span>
                              {a.status === 'pending' ? 'Menunggu' :
                               a.status === 'shortlisted' ? 'Shortlist' :
                               a.status === 'accepted' ? 'Diterima' :
                               a.status === 'rejected' ? 'Ditolak' : a.status}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Dilamar pada {new Date(a.created_at || Date.now()).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {a.cover_letter && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Surat Lamaran</h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{a.cover_letter}</p>
                        </div>
                      )}

                      {a.user?.skills && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Keterampilan</h4>
                          <div className="flex flex-wrap gap-2">
                            {a.user.skills.split(',').map((skill, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                      {a.status !== 'shortlisted' && (
                        <button
                          onClick={()=>setStatus(a.id, 'shortlisted')}
                          className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Shortlist
                        </button>
                      )}

                      {a.status !== 'accepted' && (
                        <button
                          onClick={()=>setStatus(a.id, 'accepted')}
                          className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Terima
                        </button>
                      )}

                      {a.status !== 'rejected' && (
                        <button
                          onClick={()=>setStatus(a.id, 'rejected')}
                          className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Tolak
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  )
}
