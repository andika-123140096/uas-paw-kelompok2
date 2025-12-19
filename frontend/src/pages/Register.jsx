import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register, login } from '../api'
import { useAuth } from '../components/AuthProvider'

export default function Register() {
  const [payload, setPayload] = useState({ name: '', email: '', password: '', role: 'job_seeker' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()

  async function submit(e) {
    e.preventDefault()
    setErr(null)

    if (payload.password !== confirmPassword) {
      setErr('Password dan konfirmasi password tidak cocok')
      return
    }

    if (payload.password.length < 6) {
      setErr('Password minimal 6 karakter')
      return
    }

    setLoading(true)

    try {
      await register(payload)

      const loginData = await login(payload.email, payload.password)
      if (loginData.token && loginData.role) {
        authLogin(loginData.token, loginData.role)
        navigate('/jobs')
      } else {
        navigate('/login')
      }
    } catch (e) {
      setErr(e.error || 'Terjadi kesalahan saat registrasi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-6 pt-16 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-indigo-50/30 to-transparent dark:from-transparent dark:via-gray-800/10 dark:to-transparent"></div>
      <div className="absolute top-32 left-16 w-72 h-72 bg-indigo-200/20 dark:bg-indigo-900/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-56 h-56 bg-blue-200/20 dark:bg-blue-900/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">Buat Akun Baru</h1>
          <p className="text-gray-600 dark:text-gray-300">Bergabunglah dengan komunitas pencari kerja kami</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {err && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 animate-slide-up">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                placeholder="John Doe"
                value={payload.name}
                onChange={e=>setPayload({...payload, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                placeholder="nama@email.com"
                value={payload.email}
                onChange={e=>setPayload({...payload, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                placeholder="••••••••"
                type="password"
                value={payload.password}
                onChange={e=>setPayload({...payload, password: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konfirmasi Password</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                placeholder="••••••••"
                type="password"
                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipe Akun</label>
              <select
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                value={payload.role}
                onChange={e=>setPayload({...payload, role: e.target.value})}
              >
                <option value="job_seeker">Pencari Kerja</option>
                <option value="employer">Pemberi Kerja</option>
              </select>
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
                  Mendaftarkan...
                </div>
              ) : (
                'Daftar'
              )}
            </button>
          </form>

          <div className="mt-6 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-gray-600 dark:text-gray-300">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
