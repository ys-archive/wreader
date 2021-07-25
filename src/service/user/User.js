import axios from 'axios';
import { BASE_URL } from '@env';
import md5 from 'md5';
import { useGetSWR } from '#hooks';

// https://app.gitbook.com/@wreader/s/wreader/untitled

class User {
  static async POST_registerUserProfilePhoto(path) {
    console.log(`register User Profile Photo::Path:${path}`);
    // TODO: Persist the userId throughout the app
    const { data } = await axios.post(`${BASE_URL}user/img/{userId}`);
  }
}

export default User;
