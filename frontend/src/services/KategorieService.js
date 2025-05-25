import api from '@/api';

export async function fetchKategorien() {
  const response = await api.get('/kategorie');
  return response.data;
}
