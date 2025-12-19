import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJobApplicants, updateApplicationStatus } from '../api'

export default function Applicants(){
  const { job_id } = useParams()
  const navigate = useNavigate()
  const [apps, setApps] = useState([])
  const [err, setErr] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  async function load(){
    setErr(null)
    try{ const data = await getJobApplicants(job_id); setApps(data || []) } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  useEffect(()=>{ load() }, [job_id])

  async function setStatus(id, status){
    try{ await updateApplicationStatus(id, status); load() } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  const filteredApps = apps.filter(a => {
    const matchesStatus = filterStatus === 'all' || a.status?.toLowerCase() === filterStatus.toLowerCase()
    const matchesSearch = !searchTerm || a.seeker_name?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/my-jobs')}
          className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Lowongan Saya
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pelamar Lowongan</h1>
          <p className="text-gray-600 dark:text-gray-300">Kelola semua pelamar untuk lowongan kerja ini</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{apps.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Pelamar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{apps.filter(a => a.status === 'pending').length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Menunggu</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{apps.filter(a => a.status === 'shortlisted').length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Shortlist</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{apps.filter(a => a.status === 'accepted').length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Diterima</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari berdasarkan nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="md:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="shortlisted">Shortlist</option>
                <option value="accepted">Diterima</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        {err && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
            {err}
          </div>
        )}

        <div className="space-y-6">
          {filteredApps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Belum ada pelamar</h3>
              <p className="text-gray-600 dark:text-gray-300">Lowongan kerja ini belum memiliki pelamar</p>
            </div>
          ) : (
            filteredApps.map(a => {
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
                <div key={a.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 mb-6 lg:mb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                            {(a.seeker_name || 'U')[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {a.seeker_name}
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
                              Dilamar pada {new Date(a.applied_date || Date.now()).toLocaleDateString('id-ID')}
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

                      {a.skills && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Keterampilan</h4>
                          <div className="flex flex-wrap gap-2">
                            {a.skills.split(',').map((skill, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {a.experience && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Pengalaman</h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{a.experience}</p>
                        </div>
                      )}

                      {a.cv_url && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">CV</h4>
                          <a href={a.cv_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                            Lihat CV
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="lg:w-48">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Lamaran</label>
                      <select
                        value={a.status || 'pending'}
                        onChange={(e) => setStatus(a.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="pending">Menunggu</option>
                        <option value="shortlisted">Shortlist</option>
                        <option value="accepted">Diterima</option>
                        <option value="rejected">Ditolak</option>
                      </select>
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
