import axios from 'axios';
import { BASE_URL } from '@env';
import md5 from 'md5';
import { useGetSWR } from '#hooks';

// https://app.gitbook.com/@wreader/s/wreader/untitled

class UserService {

  

  static async POST_registerUserProfilePhoto(path) {
    console.log(`register User Profile Photo::Path:${path}`);
    // TODO: Persist the userId throughout the app
    const { data } = await axios.post(`${BASE_URL}user/img/{userId}`);
  }

  static async GET_getUserInfo(userId) {
    const { data, isLoading, error, mutate } = await useGetSWR(
      `user/${userId}`,
    );
  }

  static async POST_dropUser(userId) {
    const { data } = await axios.post(`${BASE_URL}user/drop/${userId}`);
    const { code, message } = data;
  }

  static async PUT_updateUser(
    userId,
    {
      introduction: intro,
      facebook,
      instagram,
      nickname: nick,
      password: pass,
    },
  ) {
    // TODO: pass -> md5 -> post
    const covertedPass = pass;
    const { data } = await axios.post(`${BASE_URL}user/${userId}`, {
      intro,
      facebook,
      instagram,
      nick,
      pass: covertedPass,
    });
  }

  static async DELETE_DropCancel(userId) {
    const { data } = await post.delete(`${BASE_URL}user/drop/${userId}`);
    const { code, message } = data;
  }
}

export default UserService;
