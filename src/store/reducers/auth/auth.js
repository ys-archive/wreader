import { action, thunk } from 'easy-peasy';

const model = {
  isAutoLogin: false,
};

export default {
  model,
  setIsAutoLogin: action((state, payload) => {
    if (typeof payload === 'boolean') {
      throw new Error("setIsAutoLogin():: payload must be 'boolean'");
    }

    state.model.isAutoLogin = payload;
  }),

  toggleIsAutoLogin: action(state => {
    if (typeof payload === 'boolean') {
      throw new Error("setIsAutoLogin():: payload must be 'boolean'");
    }

    state.model.isAutoLogin = !state.model.isAutoLogin;
  }),
  
  login: thunk(async (actions, payload) => {
    const { email, password } = payload;
    // TODO: send to the server
    // await Service.POST_Login(email, password).catch(err => console.error(err));
  }),

  
};
