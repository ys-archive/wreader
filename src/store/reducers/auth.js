import { action, computed } from 'easy-peasy';

const model = {
  isLoggedIn: false,
  userId: 0,
  email: '',
};

export default {
  model,

  login: action(state => {
    state.model.isLoggedIn = true;
  }),

  logout: action(state => {
    state.model.isLoggedIn = false;
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

  getUserInfo: computed(state => {}),

  getUserName: computed(state => {}),
};
