import { useEffect, useState } from 'react'
import type { employeeType } from '../utils/global'

type propsType = {
  addEmployee: (emp: employeeType) => void
  updateData: employeeType | null
  confirmUpdate: (emp: employeeType) => void
}

const HOBBIES = ['Reading', 'Gaming', 'Coding', 'GTA 5']
const CITIES = ['Surat', 'Ahmedabad', 'Pune', 'Bangalore']
const empty: employeeType = { fName: '', lName: '', email: '', phone: '', gender: '', hobby: [], city: CITIES[0], address: '' }

const inputCls = "w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition text-sm"

export default function StudentForm({ addEmployee, updateData, confirmUpdate }: propsType) {
  const [form, setForm] = useState<employeeType>(empty)

  useEffect(() => { setForm(updateData ?? empty) }, [updateData])

  const set = (key: keyof employeeType, val: string) => setForm(f => ({ ...f, [key]: val }))
  const toggleHobby = (h: string) =>
    setForm(f => ({ ...f, hobby: f.hobby.includes(h) ? f.hobby.filter(x => x !== h) : [...f.hobby, h] }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateData ? confirmUpdate(form) : addEmployee(form)
    setForm(empty)
  }

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          {updateData ? '✏️ Edit Student' : '🎓 Student Registration'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {updateData ? 'Update the student details below.' : 'Fill in the details to register a new student.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">First Name</label>
            <input type="text" required value={form.fName} onChange={e => set('fName', e.target.value)} placeholder="Rahul" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Last Name</label>
            <input type="text" required value={form.lName} onChange={e => set('lName', e.target.value)} placeholder="Sharma" className={inputCls} />
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
            <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="rahul@example.com" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Phone</label>
            <input type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" className={inputCls} />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Gender</label>
          <div className="flex gap-3">
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg border cursor-pointer text-sm font-semibold transition
                  ${form.gender === g
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={e => set('gender', e.target.value)} className="hidden" />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hobbies</label>
          <div className="grid grid-cols-2 gap-3">
            {HOBBIES.map(h => (
              <label key={h}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer text-sm font-medium transition
                  ${form.hobby.includes(h)
                    ? 'bg-violet-500/10 border-violet-500 text-violet-400'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                <input type="checkbox" checked={form.hobby.includes(h)} onChange={() => toggleHobby(h)} className="hidden" />
                <span className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition
                  ${form.hobby.includes(h) ? 'bg-violet-500 border-violet-500' : 'border-gray-600'}`}>
                  {form.hobby.includes(h) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                {h}
              </label>
            ))}
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">City</label>
          <select value={form.city} onChange={e => set('city', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition text-sm appearance-none cursor-pointer">
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Address</label>
          <textarea rows={3} value={form.address} onChange={e => set('address', e.target.value)}
            placeholder="Enter your address..."
            className={`${inputCls} resize-none`} />
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold text-sm transition active:scale-95">
          {updateData ? 'Update Student' : 'Register Student'}
        </button>

      </form>
    </div>
  )
}
