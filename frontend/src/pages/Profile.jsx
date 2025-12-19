import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile, updateProfile } from '../api'

export default function Profile(){
  const navigate = useNavigate()
  const [profile, setProfile] = useState({ name:'', skills:'', experience:'', cv_url:'' })
  const [err, setErr] = useState(null)
  const [msg, setMsg] = useState(null)

  async function load(){
    setErr(null)
    try{ const data = await getProfile(); setProfile({ name: data.name || '', skills: data.skills || '', experience: data.experience || '', cv_url: data.cv_url || '' }) } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  useEffect(()=>{ load() }, [])

  async function submit(e){
    e.preventDefault(); setErr(null); setMsg(null)
    try{ await updateProfile(profile); setMsg('Profile updated') } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/jobs')}
          className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Lowongan
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profil Saya</h1>
          <p className="text-gray-600 dark:text-gray-300">Kelola informasi profil Anda untuk meningkatkan peluang karir</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          {err && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
              {err}
            </div>
          )}

          {msg && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-6">
              {msg}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="John Doe"
                value={profile.name}
                onChange={e=>setProfile({...profile, name:e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keterampilan</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="JavaScript, React, Node.js, Python (pisahkan dengan koma)"
                value={profile.skills}
                onChange={e=>setProfile({...profile, skills:e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pengalaman</label>
              <textarea
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-32 resize-none"
                placeholder="Jelaskan pengalaman kerja Anda, posisi sebelumnya, dan pencapaian..."
                value={profile.experience}
                onChange={e=>setProfile({...profile, experience:e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link CV</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="https://drive.google.com/your-cv-link"
                value={profile.cv_url}
                onChange={e=>setProfile({...profile, cv_url:e.target.value})}
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Simpan Profil
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
