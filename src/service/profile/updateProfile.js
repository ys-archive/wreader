import axios from 'axios';

export const updateProfile = async newProfileContents => {
  // TODO: 프로필 정보 (닉네임, 인스타그램 주소, 페이스북 주소, 자기 소개) 갱신 -> PUT - Update User Info
  await axios.put(`${BASE_URL}/.....`, { params: newProfileContents });
};
