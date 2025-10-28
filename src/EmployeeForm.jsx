import { useState } from 'react';
import { createEmployee } from './api';

export default function EmployeeForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', email: '', department: '', age: '', gender: '' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!form.name.trim() || !form.address.trim()) {
      setErr('Name and address are required');
      return;
    }
    setSaving(true);
    try {
      await createEmployee(form);
      setForm({ name: '', address: '', department: '', age: '', gender: '' });
      onCreated?.(); // ask parent to refresh list
    } catch (ex) {
      setErr(ex.message || 'Failed to save employee');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: '8px', marginBottom: '1rem' }}>
      <h3>Add Employee</h3>
      <input
        name="name" placeholder="Full Name"
        value={form.name} onChange={update}
      />
      <input
        name="address" placeholder="Address"
        value={form.address} onChange={update} type="address"
      />
      <input
        name="department" placeholder="Department"
        value={form.department} onChange={update}
      />
      <input
         name="age" placeholder="Age"
         value={form.age} onChange={update}
      />
      <input
      name="gender" placeholder="Gender"
      value={form.gender} onChange={update}
      />
      {err && <div style={{ color: 'crimson' }}>{err}</div>}
      <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Employee'}</button>
    </form>
  );
}
