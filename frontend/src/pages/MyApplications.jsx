import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyApplications } from '../api'

export default function MyApplications(){
  const [apps, setApps] = useState([])
  const [err, setErr] = useState(null)

  async function load(){
    setErr(null)
    try{ const data = await getMyApplications(); setApps(data || []) } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lamaran Saya</h1>
          <p className="text-gray-600 dark:text-gray-300">Pantau status semua lamaran kerja yang telah Anda kirim</p>
        </div>

        {err && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
            {err}
          </div>
        )}

        <div className="space-y-6">
          {apps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Belum ada lamaran</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Mulai melamar pekerjaan impian Anda</p>
              <Link
                to="/jobs"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari Lowongan
              </Link>
            </div>
          ) : (
            apps.map(a => {
              const getStatusColor = (status) => {
                switch (status?.toLowerCase()) {
                  case 'pending':
                    return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
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
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {a.job?.title || a.job_title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Dilamar pada {new Date(a.created_at || Date.now()).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(a.status)}`}>
                        <span className="mr-2">{getStatusIcon(a.status)}</span>
                        {a.status === 'pending' ? 'Menunggu' :
                         a.status === 'accepted' ? 'Diterima' :
                         a.status === 'rejected' ? 'Ditolak' : a.status}
                      </span>
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
