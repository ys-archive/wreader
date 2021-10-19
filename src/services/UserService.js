import { instance } from "./AxiosInstance"

class UserService {
  static async POST_registerUserProfilePhoto(userId, path) {
    console.log(`register User Profile Photo @ ${path}`)
    
    const { data, status } = await instance.post(`user/img/${userId}`, {
      path,
    })
    const { code } = data
    return code
  }

  static async GET_getUserInfo(userId) {
    const { data, status } = await instance
      .get(`user/${userId}`)
      .catch(console.error)
    return { data, status }
  }

  static async POST_dropUser(userId) {
    const { data, status } = await instance
      .post(`user/drop/${userId}`)
      .catch(console.error)
    return { data, user }
  }

  // static async PUT_updateUserPassword(userId, password) {
  //   // if (typeof userId !== 'number') {
  //   //   throw new Error('userId 는 number 여야합니다');
  //   // }

  //   // if (typeof password !== 'string') {
  //   //   throw new Error('password 은 string 여야 합니다.');
  //   // }

  //   // console.log('PUT_updateUserPassword');
  //   // const asMD5 = md5(password);
  //   const { data, status } = await instance
  //     .put(`user/${userId}`, {
  //       // pass: asMD5,
  //       pass: password,
  //     })
  //     .catch(console.error);
  //   console.log(data, status);

  //   const { code } = data;
  //   return code;
  // }

  // code === 1 -> 업데이트 성공
  // code === 102 -> 해당 유저 정보가 없음 (정보가 없는 회원이 업데이트 시도 했을 시)
  static async PUT_updateUserInfo(
    userId,
    password,
    nickname,
    introduction,
    facebook,
    instagram,
  ) {
    // if (typeof userId !== 'number') {
    //   throw new Error('userId 는 number 여야합니다');
    // }

    // if (typeof nickname !== 'string') {
    //   throw new Error('nickname 은 string 여야 합니다.');
    // }

    // if (typeof introduction !== 'string') {
    //   throw new Error('introduction 은 string 여야 합니다.');
    // }

    // if (typeof facebook !== 'string') {
    //   throw new Error('facebook 은 string 여야 합니다.');
    // }

    // if (typeof instagram !== 'string') {
    //   throw new Error('instagram 은 string 여야 합니다.');
    // }

    const { data, status } = await instance
      .put(`user/${userId}`, {
        intro: introduction,
        pass: password,
        facebook,
        instagram,
        nick: nickname,
      })
      .catch(console.error)

    const { code } = data
    return code
  }

  static async DELETE_DropCancel(userId) {
    const { data } = await instance
      .delete(`user/drop/${userId}`)
      .catch(console.error)
    const { code } = data
    return code
  }
}

export default UserService
