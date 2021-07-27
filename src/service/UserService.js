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
    const { data, isLoading, error, mutate } = await useGetSWR(
      `user/${userId}`,
    );
  }

  static async POST_dropUser(userId) {
    const { data } = await axios
      .post(`${BASE_URL}user/drop/${userId}`)
      .catch(console.error);
    const { code, message } = data;
  }

  static async PUT_updateUser(
    userId,
    introduction,
    facebook,
    instagram,
    nickname,
    password,
  ) {
    // TODO: pass -> md5 -> post
    const covertedPass = password;
    const { data, status } = await axios
      .post(`${BASE_URL}user/${userId}`, {
        intro: introduction,
        facebook,
        instagram,
        nick: nickname,
        pass: covertedPass,
      })
      .catch(console.error);
  }

  static async DELETE_DropCancel(userId) {
    const { data } = await post
      .delete(`${BASE_URL}user/drop/${userId}`)
      .catch(console.error);
    const { code, message } = data;
  }
}

export default UserService;
