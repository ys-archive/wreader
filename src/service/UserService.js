import axios from 'axios';
import { BASE_URL } from '@env';
import md5 from 'md5';
import { useGetSWR } from '#hooks';

// https://app.gitbook.com/@wreader/s/wreader/untitled

class UserService {
  static async POST_registerUserProfilePhoto(path) {
    console.log(`register User Profile Photo::Path:${path}`);
    // TODO: Persist the userId throughout the app
    const { data } = await axios
      .post(`${BASE_URL}user/img/{userId}`)
      .catch(console.error);
  }

  static async GET_getUserInfo(userId) {
    // const { data, isLoading, error, mutate } = await useGetSWR(
    //   `user/${userId}`,
    // );
  }

  static async POST_dropUser(userId) {
    const { data } = await axios
      .post(`${BASE_URL}user/drop/${userId}`)
      .catch(console.error);
    const { code, message } = data;
  }

  // code === 1 -> 업데이트 성공
  // code === 102 -> 해당 유저 정보가 없음 (정보가 없는 회원이 업데이트 시도 했을 시)
  static async PUT_updateUser(
    userId,
    password, // required
    nickname = '',
    introduction = '',
    facebook = '',
    instagram = '',
  ) {
    if (typeof userId !== 'number') {
      throw new Error('userId 는 number 여야합니다');
    }

    if (typeof nickname !== 'string') {
      throw new Error('nickname 은 string 여야 합니다.');
    }

    if (typeof password !== 'string') {
      throw new Error('password 은 string 여야 합니다.');
    }

    if (typeof introduction !== 'string') {
      throw new Error('introduction 은 string 여야 합니다.');
    }

    if (typeof facebook !== 'string') {
      throw new Error('facebook 은 string 여야 합니다.');
    }

    if (typeof instagram !== 'string') {
      throw new Error('instagram 은 string 여야 합니다.');
    }

    const asMD5 = md5(password);
    const { data, status } = await axios
      .post(`${BASE_URL}user/${userId}`, {
        intro: introduction,
        facebook,
        instagram,
        nick: nickname,
        pass: asMD5,
      })
      .catch(console.error);

    const { code } = data;

    return code;
  }

  static async DELETE_DropCancel(userId) {
    const { data } = await post
      .delete(`${BASE_URL}user/drop/${userId}`)
      .catch(console.error);
    const { code, message } = data;
  }
}

export default UserService;
