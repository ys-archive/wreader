import { action } from 'easy-peasy';

const model = {
  profileUrl: '',
};

export default {
  model,

  //   login: action(state => {
  //     state.model.isLoggedIn = true;
  //   }),

  //   logout: action(state => {
  //     state.model.isLoggedIn = false;
  //   }),

  //   setUserId: action((state, payload) => {
  //     if (typeof payload !== 'number') {
  //       throw new Error(
  //         `userId as payload are supopsed to be the type of number!`,
  //       );
  //     }

  //     if (payload <= 0) {
  //       throw new Error(`userId can't be 0 below`);
  //     }

  //     state.model.userId = payload;
  //   }),
};
