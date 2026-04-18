import { useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'
import type { employeeType } from './utils/global'

export default function App() {
  const [employees, setEmployees] = useState<employeeType[]>([])
  const [updateIndex, setUpdateIndex] = useState<number | null>(null)

  const addEmployee = (emp: employeeType) => setEmployees(prev => [...prev, emp])
  const deleteEmployee = (i: number) => setEmployees(prev => prev.filter((_, idx) => idx !== i))
  const updateEmployee = (i: number) => setUpdateIndex(i)
  const confirmUpdate = (emp: employeeType) => {
    setEmployees(prev => prev.map((e, i) => i === updateIndex ? emp : e))
    setUpdateIndex(null)
  }

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Navbar */}
      <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-gray-900 font-black text-sm">S</div>
          <span className="text-white font-bold text-sm tracking-wide">Student Portal</span>
        </div>
        <span className="text-xs text-gray-500 font-medium">{employees.length} student{employees.length !== 1 ? 's' : ''} registered</span>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <Form
          addEmployee={addEmployee}
          updateData={updateIndex !== null ? employees[updateIndex] : null}
          confirmUpdate={confirmUpdate}
        />
        {employees.length > 0 && (
          <Table allEmployees={employees} deleteEmployee={deleteEmployee} updateEmployee={updateEmployee} />
        )}
      </main>

    </div>
  )
}
