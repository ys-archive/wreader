import { action, thunk } from 'easy-peasy';
import * as mmkv from 'react-native-mmkv'; // TODO: Official Doc 가보기

const model = {
  // TODO: 일주일간 보지않게(Event Modal) ->  Persisted 으로 구현, react-native-mmvk 사용
};

export default {
  model,
  //   setAutoLogin: action((state, payload) => {
  //     if (typeof payload === 'boolean') {
  //       throw new Error("setIsAutoLogin():: payload must be 'boolean'");
  //     }

  //     state.model.isAutoLogin = payload;
  //   }),

  //   toggleAutoLogin: action(state => {
  //     state.model.isAutoLogin = !state.model.isAutoLogin;
  //   }),

  //   setLoggedIn: action(state => {
  //     state.model.isLoggedIn = true;
  //   }),

  //   setLoggedOut: action(state => {
  //     state.model.isLoggedIn = false;
  //   }),

  // login: thunk(async (actions, payload) => {
  //   const { email, password } = payload;
  //   // TODO: send to the server
  //   // await Service.POST_Login(email, password).catch(err => console.error(err));
  // }),
};
