export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export async function getEmployees() {
  const res = await fetch(`${API_BASE}/emp_service/api/get/emp`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch employees: ${res.status} ${text}`);
  }
  return res.json();
}


export async function createEmployee(payload) {
  const res = await fetch(`${API_BASE}/emp_service/api/save/emp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // return created employee
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API_BASE}/emp_service/api/remove/emp/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await res.text());
  return true;
}