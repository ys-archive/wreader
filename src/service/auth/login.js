import axios from 'axios';
import { BASE_URL } from '@env';
import md5 from 'md5';

export const login = async (email, password) => {
  // const encrpyted = md5(password);
  // console.log(email, encrpyted);
  // console.log(BASE_URL);

  const { data } = await axios
    .post(`${BASE_URL}login`, {
      email: email,
      pass: password,
    })
    .catch(err => console.error(e));
  console.log(data);
  const { code, message } = data;
  if (code !== 1) {
    return false;
  } else {
    return true;
  }
};
