import { action } from 'easy-peasy';

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
};
