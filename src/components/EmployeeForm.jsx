import { useState } from 'react'
import { DEPARTMENTS } from '../constants'

const empty = { name: '', email: '', department: DEPARTMENTS[0], role: '', salary: '' }

export default function EmployeeForm({ employee, onSave, onCancel }) {
  const [form, setForm] = useState(employee || empty)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email')
      return
    }
    setError('')
    onSave({ ...form, salary: Number(form.salary) || 0 })
    if (!employee) setForm(empty)
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{employee ? 'Edit employee' : 'Add employee'}</h2>
      <div className="grid">
        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <select name="department" value={form.department} onChange={handleChange}>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
        <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="actions">
        <button type="submit">{employee ? 'Update' : 'Add'}</button>
        {employee && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
