import { useEffect, useState } from 'react'
import EmployeeForm from './components/EmployeeForm'
import EmployeeTable from './components/EmployeeTable'
import { DEPARTMENTS } from './constants'

const STORAGE_KEY = 'employees'

const seed = [
  { id: 1, name: 'Aarav Sen', email: 'aarav@example.com', department: 'Engineering', role: 'Frontend Developer', salary: 65000 },
  { id: 2, name: 'Riya Das', email: 'riya@example.com', department: 'Design', role: 'UI Designer', salary: 52000 },
  { id: 3, name: 'Kabir Roy', email: 'kabir@example.com', department: 'HR', role: 'HR Executive', salary: 41000 },
]

function loadEmployees() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : seed
  } catch {
    return seed
  }
}

export default function App() {
  const [employees, setEmployees] = useState(loadEmployees)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
  }, [employees])

  const saveEmployee = (data) => {
    if (data.id) {
      setEmployees(employees.map((e) => (e.id === data.id ? data : e)))
    } else {
      setEmployees([...employees, { ...data, id: Date.now() }])
    }
    setEditing(null)
  }

  const deleteEmployee = (id) => {
    if (!window.confirm('Delete this employee?')) return
    setEmployees(employees.filter((e) => e.id !== id))
  }

  const visible = employees.filter((e) => {
    const matchesSearch = [e.name, e.email, e.role]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesSearch && (dept === 'All' || e.department === dept)
  })

  const totalPayroll = visible.reduce((sum, e) => sum + Number(e.salary), 0)

  return (
    <div className="container">
      <header>
        <h1>Employee Management</h1>
        <div className="stats">
          <span>{visible.length} employees</span>
          <span>Payroll: ₹{totalPayroll.toLocaleString('en-IN')}</span>
        </div>
      </header>

      <EmployeeForm
        key={editing ? editing.id : 'new'}
        employee={editing}
        onSave={saveEmployee}
        onCancel={() => setEditing(null)}
      />

      <div className="filters">
        <input
          placeholder="Search by name, email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={dept} onChange={(e) => setDept(e.target.value)}>
          <option>All</option>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <EmployeeTable employees={visible} onEdit={setEditing} onDelete={deleteEmployee} />
    </div>
  )
}
