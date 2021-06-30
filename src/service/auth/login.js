import axios from 'axios';
import { BASE_URL } from '@env';

export const login = async (id, password) =>
  await axios.post(`${BASE_URL}${path}`, { params: { id, password } });
