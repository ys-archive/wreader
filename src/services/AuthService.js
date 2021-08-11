import * as axios from './AxiosInstance';
import md5 from 'md5';

const AGREE_MARKETING = 1;
const DISAGREE_MARKETING = 2;

// https://app.gitbook.com/@wreader/s/wreader/

class AuthService {
  // code === 1: 회원가입 성공
  // code === 101: 입력한 이메일이 이미 존재
  static async POST_createUser(
    email,
    password,
    nickname,
    instagram = '',
    facebook = '',
    introduction = '',
    marketingAgree = DISAGREE_MARKETING,
  ) {
    // const asMD5 = md5(password);
    const { data, status } = await axios.instance
      .post('user', {
        email,
        // pass: asMD5,
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

    const { code } = data;
    // console.log(data);
    return code;
  }

  // code === 1: 로그인 성공
  // code === 100: 탈퇴 신청중인 유저
  // code === 102: 잘못된 이메일
  // code === 103: 잘못된 비밀번호
  static async POST_login(email, password) {
    // const asMD5 = md5(password);
    const { data } = await axios.instance
      .post('login', { email, pass: password })
      .catch(console.error);

    const { code, item } = data;
    return { code, item };
  }

  // code === 1 -> 사용 가능한 이메일
  // code === 101 -> 사용 불가능한 이메일 (이미 사용중인 메일임)
  static async GET_CheckUserExists(email) {
    const { data, status } = await axios.instance
      .get('user/check/email', {
        params: { email },
      })
      .catch(console.error);
    const { code } = data;
    console.log(code, status);
    return code;
  }

  // code === 1 -> 닉네임 중복 없음
  // code === 105 -> 닉네임 중복
  static async GET_CheckUserNickExists(nick) {
    const { data, status } = await axios.instance
      .get('user/check/nick', {
        params: { nick },
      })
      .catch(console.error);
    // console.log(data.code);
    const { code } = data;
    // console.log(code);
    return code;
  }
}

export default AuthService;
