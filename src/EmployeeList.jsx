import { useState, useCallback, useEffect } from 'react';
import { getEmployees, deleteEmployee } from './api';

export default function EmployeeList({ reloadSignal }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setErr(''); setLoading(true);
    try { setEmployees(await getEmployees()); }
    catch (e) { setErr(e.message || 'Something went wrong'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load, reloadSignal]); // reload when signal changes

  const onDelete = async (id) => {
    if (!confirm('Delete this employee?')) return;
    setErr('');
    setDeletingId(id);
    try {
      await deleteEmployee(id);
      // Optimistic UI: remove the row immediately
      setEmployees(list => list.filter(e => e.id !== id));
    } catch (e) {
      setErr(e.message || 'Failed to delete employee');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Employees</h2>
      <button onClick={load} disabled={loading}>
        {loading ? 'Loading…' : 'Load Employees'}
      </button>

      {err && <p style={{ color: 'crimson' }}>{err}</p>}

      {employees.length > 0 && (
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: '8px' }}>ID</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: '8px' }}>Name</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: '8px' }}>Department</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: '8px' }}>Address</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: '8px' }}>Age</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.id}>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: '8px' }}>{e.id}</td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: '8px' }}>{e.name}</td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: '8px' }}>{e.department}</td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: '8px' }}>{e.address}</td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: '8px' }}>{e.age}</td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: '8px' }}>
                  <button
                    onClick={() => onDelete(e.id)}
                    disabled={deletingId === e.id}
                    title="Delete employee"
                  >
                    {deletingId === e.id ? 'Deleting…' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {employees.length === 0 && !loading && !err && (
        <p style={{ marginTop: '1rem', color: '#666' }}>Click “Load Employees” to fetch data.</p>
      )}
    </div>
  );
}
