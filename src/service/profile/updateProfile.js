// TODO: update profile
// 닉네임, 인스타그램 주소, 페이스북 주소, 자기 소개

import axios from 'axios';

export const updateProfile = async newProfileContents => {
  await axios.post(`${BASE_URL}/.....`, { params: newProfileContents });
};
