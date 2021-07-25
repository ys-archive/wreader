import { action, thunk } from 'easy-peasy';

const model = {
  // isAutoLogin: false,
  isLoggedIn: false,
  userId: 0,
};

export default {
  model,
  
  login: action(state => {
    state.model.isLoggedIn = true;
  }),

  Logout: action(state => {
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

  // login: thunk(async (actions, payload) => {
  //   const { email, password } = payload;
  //   // TODO: send to the server
  //   // await Service.POST_Login(email, password).catch(err => console.error(err));
  // }),
};
