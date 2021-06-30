import axios from 'axios';
import { BASE_URL } from '@env';

export const setComment = async comments =>
  await axios.post(`${BASE_URL}${path}`, { params: { id, password } });
