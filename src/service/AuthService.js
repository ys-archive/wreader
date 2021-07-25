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
    const { data } = await axios.instance
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
    const { code } = data;
    return { code };

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
    const { code, item } = data;
    return {
      code,
      item,
    };

    // // 로그인 성공
    // if (code === 1) {
    //   return {
    //     code,
    //     item,
    //   };
    // }

    // // 탈퇴 신청중인 유저
    // if (code === 100) {
    //   return code;
    // }

    // // 잘못된 이메일
    // if (code === 102) {
    //   return code;
    // }

    // // 잘못된 비밀번호
    // if (code === 103) {
    //   return code;
    // }
    // TODO: 102, 103 은 "이메일 혹은 비밀번호가 잘못 되었습니다" 로 묶어 처리
  }

  static async GET_CheckUserExists(email) {
    const { data, isLoading, mutate, error } = await useGetSWR(
      'user/check/email',
    );

    if (!data) {
      // 유저 확인 실패, 서버 문제
    }

    console.log(data);
    return { code: data.code, isLoading, error, mutate };

    // if (code === 1) {
    //   // 사용 가능한 이메일
    // }

    // if (code === 101) {
    //   // 사용 불가능한 이메일 (이미 사용중인 메일임)
    // }

    // 다른 에러
  }
}

export default AuthService;
