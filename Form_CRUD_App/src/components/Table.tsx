import { useEffect, useState } from 'react'
import type { employeeType } from '../utils/global'

type propsType = {
  allEmployees: employeeType[]
  deleteEmployee: (index: number) => void
  updateEmployee: (index: number) => void
}

export default function Table({ allEmployees, deleteEmployee, updateEmployee }: propsType) {
  const [numberOfCity, setNumberOfCity] = useState(0)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setNumberOfCity(new Set(allEmployees.map(e => e.city)).size)
  }, [allEmployees])

  const filtered = allEmployees.filter(e =>
    [e.fName, e.lName, e.email, e.city].some(v => v.toLowerCase().includes(search.toLowerCase()))
  )

  const stats = [
    { label: 'Total', value: allEmployees.length, color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { label: 'Male', value: allEmployees.filter(e => e.gender === 'Male').length, color: 'text-blue-400', border: 'border-blue-500/30' },
    { label: 'Female', value: allEmployees.filter(e => e.gender === 'Female').length, color: 'text-pink-400', border: 'border-pink-500/30' },
    { label: 'Cities', value: numberOfCity, color: 'text-violet-400', border: 'border-violet-500/30' },
  ]

  return (
    <div className="space-y-5">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className={`bg-gray-900 rounded-xl border ${s.border} p-4`}>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{s.label}</p>
            <p className={`text-3xl font-black mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition text-sm" />
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                {['Student', 'Contact', 'Location', 'Hobbies', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((emp, i) => (
                <tr key={i} className="hover:bg-gray-800/40 transition group">

                  {/* Student */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {emp.fName[0]}{emp.lName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{emp.fName} {emp.lName}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                          ${emp.gender === 'Male' ? 'bg-blue-500/15 text-blue-400' : emp.gender === 'Female' ? 'bg-pink-500/15 text-pink-400' : 'bg-gray-700 text-gray-400'}`}>
                          {emp.gender}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-300">{emp.email}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{emp.phone}</p>
                  </td>

                  {/* Location */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-200">{emp.city}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[140px] mt-0.5">{emp.address}</p>
                  </td>

                  {/* Hobbies */}
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {emp.hobby.map(h => (
                        <span key={h} className="text-xs px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 font-medium">{h}</span>
                      ))}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => updateEmployee(i)}
                        className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button onClick={() => deleteEmployee(i)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm text-gray-500 font-medium">No students found</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
