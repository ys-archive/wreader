import { action, computed } from 'easy-peasy';

const model = {
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
};

export default {
  model,

  login: action(state => {
    state.model.isLoggedIn = true;
  }),

  logout: action(state => {
    state.model.isLoggedIn = false;
    state.model.userId = 0;
    state.model.email = '';
    state.model.password = '';
    state.model.info = null;
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

    state.model.userId = payload;
  }),

  setEmail: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setEmail() 의 payload 는 string 이어야 합니다.');
    }

    state.model.email = payload;
  }),

  setPassword: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setEmail() 의 payload 는 string 이어야 합니다.');
    }

    state.model.password = payload;
  }),

  setUserInfo: action((state, payload) => {
    console.log(' setUserInfo() : ', payload);
    state.model.info = {
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
