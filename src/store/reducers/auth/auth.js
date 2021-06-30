import { action, thunk } from 'easy-peasy';

const model = {
  // TODO: Persisted
  isAutoLogin: false,
  isLoggedIn: false,
};

export default {
  model,
  setAutoLogin: action((state, payload) => {
    if (typeof payload === 'boolean') {
      throw new Error("setIsAutoLogin():: payload must be 'boolean'");
    }

    state.model.isAutoLogin = payload;
  }),

  toggleAutoLogin: action(state => {
    state.model.isAutoLogin = !state.model.isAutoLogin;
  }),

  setLoggedIn: action(state => {
    state.model.isLoggedIn = true;
  }),

  setLoggedOut: action(state => {
    state.model.isLoggedIn = false;
  }),

  // login: thunk(async (actions, payload) => {
  //   const { email, password } = payload;
  //   // TODO: send to the server
  //   // await Service.POST_Login(email, password).catch(err => console.error(err));
  // }),
};
