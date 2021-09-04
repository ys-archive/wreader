import { action } from 'easy-peasy';

export default {
  // model
  isLoggedIn: false,
  userId: 0,
  email: '',
  password: '',
  info: null,

  // actions
  login: action(state => {
    state.isLoggedIn = true;
  }),

  logout: action(state => {
    state.isLoggedIn = false;
    state.userId = 0;
    state.email = '';
    state.password = '';
    state.info = null;
  }),

  setUserId: action((state, payload) => {
    if (typeof payload !== 'number') {
      throw new Error(
        `userId as payload are supopsed to be the type of number!`,
      );
    }

    if (payload <= 0) {
      throw new Error(`userId can't be 0 below`);
    }

    state.userId = payload;
  }),

  setEmail: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setEmail() 의 payload 는 string 이어야 합니다.');
    }

    state.email = payload;
  }),

  setPassword: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setEmail() 의 payload 는 string 이어야 합니다.');
    }

    state.password = payload;
  }),

  setInfo: action((state, payload) => {
    // console.log('setUserInfo() : ', payload);
    state.info = {
      nick: payload.nick ?? '',
      instagram: payload.instagram ?? '',
      facebook: payload.facebook ?? '',
      intro: payload.intro ?? '',
      marketingAgree: payload.marketingAgree,
      img: payload.img
        ? {
            id: payload.img.id ?? 0,
            userId: payload.img.userId ?? '',
            path: payload.img.path ?? '',
            createAt: payload.img.createAt ?? undefined,
          }
        : null,
    };
  }),
};

export const selectors = {
  isLoggedIn: state => state.auth.isLoggedIn,
  userId: state => state.auth.userId,
  email: state => state.auth.email,
  password: state => state.auth.password,
  info: state => state.auth.info,
};

export const actions = {
  login: actions => actions.auth.login,
  logout: actions => actions.auth.logout,
  setUserId: actions => actions.auth.setUserId,
  setEmail: actions => actions.auth.setEmail,
  setPassword: actions => actions.auth.setPassword,
  setInfo: actions => actions.auth.setInfo,
};
