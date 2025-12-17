import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJob, updateJob } from '../api'

export default function EditJob(){
  const { id } = useParams()
  const [payload, setPayload] = useState({ title:'', description:'', requirements:'', salary:'', location:'', type:'' })
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  async function load(){
    try{ const data = await getJob(id); setPayload({title:data.title||'', description:data.description||'', requirements:data.requirements||'', salary:data.salary||'', location:data.location||'', type:data.type||''}) } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  useEffect(()=>{ load() }, [id])

  async function submit(e){
    e.preventDefault(); setErr(null)
    try{ await updateJob(id, payload); navigate('/my-jobs') } catch(e){ setErr(e.error || JSON.stringify(e)) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit Lowongan Kerja</h1>
          <p className="text-gray-600 dark:text-gray-300">Perbarui detail lowongan kerja Anda</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          {err && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Judul Pekerjaan</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Software Engineer"
                value={payload.title}
                onChange={e=>setPayload({...payload, title:e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lokasi</label>
                <input
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Jakarta, Indonesia"
                  value={payload.location}
                  onChange={e=>setPayload({...payload, location:e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipe Pekerjaan</label>
                <input
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Full-time, Part-time, Contract"
                  value={payload.type}
                  onChange={e=>setPayload({...payload, type:e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gaji</label>
              <input
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Rp 5.000.000 - Rp 10.000.000"
                value={payload.salary}
                onChange={e=>setPayload({...payload, salary:e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deskripsi Pekerjaan</label>
              <textarea
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-32 resize-none"
                placeholder="Jelaskan detail pekerjaan, tanggung jawab, dan apa yang akan dilakukan kandidat..."
                value={payload.description}
                onChange={e=>setPayload({...payload, description:e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Persyaratan</label>
              <textarea
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-32 resize-none"
                placeholder="Pendidikan, pengalaman, keterampilan yang dibutuhkan..."
                value={payload.requirements}
                onChange={e=>setPayload({...payload, requirements:e.target.value})}
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
