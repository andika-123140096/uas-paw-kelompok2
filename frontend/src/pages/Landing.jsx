import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="w-full">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-24 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/20 to-transparent dark:from-transparent dark:via-gray-800/20 dark:to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent leading-tight mb-6">
              Temukan Karier Impian Anda
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Platform pencarian kerja terdepan dengan ribuan lowongan dari perusahaan terbaik. Mulai perjalanan karier Anda hari ini.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <input
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                  placeholder="Posisi, kata kunci atau perusahaan"
                />
              </div>
              <div>
                <input
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:shadow-md"
                  placeholder="Lokasi"
                />
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Cari Pekerjaan
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/jobs" className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-all duration-200 hover:scale-105">
                Jelajahi Lowongan →
              </Link>
              <Link to="/create-job" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Pasang Lowongan
              </Link>
            </div>
          </div>
          <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-2">10,000+</div>
                <div className="text-gray-600 dark:text-gray-300">Lowongan Aktif</div>
              </div>
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent mb-2">5,000+</div>
                <div className="text-gray-600 dark:text-gray-300">Perusahaan Partner</div>
              </div>
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent mb-2">50,000+</div>
                <div className="text-gray-600 dark:text-gray-300">Kandidat Sukses</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-r from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-radial from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/5 dark:via-transparent dark:to-purple-900/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 leading-tight pb-2">Mengapa Memilih Kami?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Platform modern dengan fitur-fitur canggih untuk membantu Anda menemukan pekerjaan impian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl flex items-center justify-center mb-6 animate-bounce-subtle">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cepat & Efisien</h3>
              <p className="text-gray-600 dark:text-gray-400">Temukan pekerjaan yang sesuai dalam hitungan menit dengan algoritma pencarian canggih kami.</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl flex items-center justify-center mb-6 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Terpercaya & Aman</h3>
              <p className="text-gray-600 dark:text-gray-400">Semua perusahaan diverifikasi dan data Anda dilindungi dengan enkripsi tingkat enterprise.</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl flex items-center justify-center mb-6 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Komunitas Besar</h3>
              <p className="text-gray-600 dark:text-gray-400">Bergabung dengan ribuan profesional yang telah sukses menemukan karier melalui platform kami.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-gray-900 dark:via-gray-950 dark:to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent dark:from-gray-800/10 dark:via-transparent dark:to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">Siap Memulai Karier Baru?</h2>
          <p className="text-xl text-blue-100 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Bergabunglah dengan ribuan profesional yang telah menemukan peluang karier melalui platform kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 hover:bg-gray-50">
              Daftar Sekarang
            </Link>
            <Link to="/jobs" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
              Cari Lowongan
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
