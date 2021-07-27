import * as axios from './AxiosInstance';
import md5 from 'md5';
import { useGetSWR } from '#hooks';

const AGREE_MARKETING = 1;
const DISAGREE_MARKETING = 2;

// https://app.gitbook.com/@wreader/s/wreader/

class AuthService {
  static async POST_createUser(
    email,
    password,
    nickname,
    instagram = '',
    facebook = '',
    introduction = '',
    marketingAgree = DISAGREE_MARKETING,
  ) {
    const { data, status } = await axios.instance
      .post('user', {
        email,
        pass: password,
        nick: nickname,
        instagram,
        facebook,
        intro: introduction,
        marketingAgree,
      })
      .catch(console.error);

    if (!data) {
      // 회원가입 실패! 서버 에러
    }

    console.log(data);
    return { code: data.code, status };

    // 회원가입 성공
    // if (code === 1) {
    //   return {};
    // }

    // // 입력한 이메일이 이미 존재
    // if (code === 101) {
    // }

    // 다른 에러
  }

  static async POST_login(email, password) {
    // const encrpyted = md5(password);
    // console.log(email, encrpyted);
    console.log(email, password);
    // console.log(BASE_URL);

    const { data } = await axios.instance
      .post('login', { email, pass: password })
      .catch(console.error);

    if (!data) {
      // 로그인 실패! 서버 문제
    }

    console.log(data);
    const { code } = data;
    return code;

    // code === 1: 로그인 성공
    // code === 100: 탈퇴 신청중인 유저
    // code === 102: 잘못된 이메일
    // code === 103: 잘못된 비밀번호
  }

  static async GET_CheckUserExists(email) {
    const { data, status } = await axios.instance.get('user/check/email', {
      params: { email: email.trim() },
    }).catch(console.error);
    const { code } = data;
    console.log(code, status);
    return code;
    // return data?.code;

    // if (code === 1) {
    //   // 사용 가능한 이메일
    // }

    // if (code === 101) {
    //   // 사용 불가능한 이메일 (이미 사용중인 메일임)
    // }

    // 다른 에러
  }

  static async GET_CheckUserNickExists(nickname) {
    const { data, status } = await axios.instance.get('user/check/nick'. {
      params: { nick: nickname.trim() }
    }).catch(console.error);
    const { code } = data;
    console.log(code, status);
    return code;
  }
}

export default AuthService;
