import { action } from 'easy-peasy';

export default {
  // model
  isLoggedIn: false,
  userId: 0,
  email: '',
  password: '',
  info: {
    instagram: '',
    facebook: '',
    intro: '',
    marketingAgree: 0,
    nick: '',
    img: {
      id: 0,
      userId: '',
      path: '',
      createAt: '',
    },
  },

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

  setUserInfo: action((state, payload) => {
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
  selIsLoggedIn: state => state.auth.isLoggedIn,
  selUserId: state => state.auth.userId,
  selEmail: state => state.auth.email,
  selPassword: state => state.auth.password,
  selInfo: state => state.auth.info,
};

export const actions = {
  actLogin: actions => actions.auth.login,
  actLogout: actions => actions.auth.logout,
  actSetUserId: actions => actions.auth.setUserId,
  actSetEmail: actions => actions.auth.setEmail,
  actSetPassword: actions => actions.auth.setPassword,
  actSetUserInfo: actions => actions.auth.setUserInfo,
};
