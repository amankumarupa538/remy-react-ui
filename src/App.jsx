import { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

export default function App() {
  const [reloadKey, setReloadKey] = useState(0);
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <EmployeeForm onCreated={() => setReloadKey(k => k + 1)} />
      <EmployeeList reloadSignal={reloadKey} />
    </div>
  );
}
