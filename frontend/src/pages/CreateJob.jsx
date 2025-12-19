import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJob } from '../api'
import { useAuth } from '../components/AuthProvider'

export default function CreateJob(){
  const [payload, setPayload] = useState({ title:'', description:'', requirements:'', salary:'', location:'', type:'' })
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isEmployer } = useAuth()

  async function submit(e){
    e.preventDefault(); setErr(null)

    if (!isEmployer) {
      setErr('Hanya employer yang dapat membuat lowongan kerja')
      return
    }

    setLoading(true)
    try{
      await createJob(payload)
      navigate('/my-jobs')
    } catch(e){
      setErr(e.error || 'Terjadi kesalahan saat membuat lowongan kerja')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-green-50/30 to-transparent dark:from-transparent dark:via-gray-800/10 dark:to-transparent"></div>
      <div className="absolute top-24 right-24 w-80 h-80 bg-green-200/20 dark:bg-green-900/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-24 left-24 w-64 h-64 bg-blue-200/20 dark:bg-blue-900/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="max-w-2xl mx-auto relative z-10">
        <button
          onClick={() => navigate('/my-jobs')}
          className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Lowongan Saya
        </button>

        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">Buat Lowongan Kerja Baru</h1>
          <p className="text-gray-600 dark:text-gray-300">Temukan kandidat terbaik untuk perusahaan Anda</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {err && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 animate-slide-up">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Judul Pekerjaan</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                placeholder="Software Engineer"
                value={payload.title}
                onChange={e=>setPayload({...payload, title:e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lokasi</label>
                <input
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                  placeholder="Jakarta, Indonesia"
                  value={payload.location}
                  onChange={e=>setPayload({...payload, location:e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipe Pekerjaan</label>
                <input
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                  placeholder="Full-time, Part-time, Contract"
                  value={payload.type}
                  onChange={e=>setPayload({...payload, type:e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gaji</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                placeholder="Rp 5.000.000 - Rp 10.000.000"
                value={payload.salary}
                onChange={e=>setPayload({...payload, salary:e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deskripsi Pekerjaan</label>
              <textarea
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-32 resize-none transition-all duration-200 hover:shadow-md"
                placeholder="Jelaskan detail pekerjaan, tanggung jawab, dan apa yang akan dilakukan kandidat..."
                value={payload.description}
                onChange={e=>setPayload({...payload, description:e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Persyaratan</label>
              <textarea
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-32 resize-none transition-all duration-200 hover:shadow-md"
                placeholder="Pendidikan, pengalaman, keterampilan yang dibutuhkan..."
                value={payload.requirements}
                onChange={e=>setPayload({...payload, requirements:e.target.value})}
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Membuat...
                </div>
              ) : (
                'Buat Lowongan'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
