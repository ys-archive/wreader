import { action, computed, thunk } from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';

const model = {
  // isAutoLogin: false,
  // email: '',
  // password: '',
  // 첫 구동인지 확인하는 플래그
  // isFirstExecute: true,
  // TODO: 일주일간 보지않게(Event Modal) ->  Persisted 으로 구현, react-native-mmkv 사용
  // dueDate: undefined,
};

export default {
  // model,

  // enableAutoLogin: action(state => {
  //   state.model.isAutoLogin = true;
  // }),
  enableAutoLogin: thunk(async (actions, payload) => {
    await AsyncStorage.setItem('isAutoLogin', true);
    // state.model.isAutoLogin = true;
  }),

  // disableAutoLogin: action(state => {
  //   state.model.email = '';
  //   state.model.password = '';
  //   state.model.isAutoLogin = false;
  // }),
  disableAutoLogin: thunk(async (actions, payload) => {
    await AsyncStorage.setItem('isAutoLogin', false);
    await AsyncStorage.setItem('email', '');
    await AsyncStorage.setItem('password', '');
  }),

  // toggleAutoLogin: action(state => {
  //   state.model.isAutoLogin = !state.model.isAutoLogin;
  //   console.log('toggle Auto Login: ', state.model.isAutoLogin);
  // }),
  toggleAutoLogin: thunk(async (actions, payload) => {
    const isAutoLogin = await AsyncStorage.getItem('isAutoLogin');
    await AsyncStorage.setItem('isAutoLogin', !isAutoLogin);
  }),

  // secureEmailPW: action((state, payload) => {
  //   const { email, password } = payload;
  //   state.model.email = email;
  //   state.model.password = password;
  // }),
  secureEmailPW: thunk(async (actions, payload) => {
    const { email, password } = payload;
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
  }),

  // executeAppFirstTime: action(state => {
  //   state.model.isFirstExecute = false;
  // }),
  executeAppFirstTime: thunk(async (actions, payload) => {
    await AsyncStorage.setItem('isFirstExecute', false);
  }),

  // ignoreEventModalFor1day: action(state => {
  //   // const currentTimeAsMs = new Date().getTime();
  //   // TODO: 1. 기한 정하기 위해 현재 시간 결정
  //   // TODO: 2. -> 1일 정확히 === dueDate
  // }),
  // ignoreEventModalFor1day: thunk(async (actions, payload) => {
  //   // const currentTimeAsMs = new Date().getTime();
  //   // TODO: 1. 기한 정하기 위해 현재 시간 결정
  //   // TODO: 2. -> 1일 정확히 === dueDate
  // }),

  // // ignoreEventModalFor7days: action(state => {
  // //   // const currentTimeAsMs = new Date().getTime();
  // //   // TODO: 1. 기한 정하기 위해 현재 시간 결정
  // //   // TODO: 2. -> 1 + 7일 정확히 === dueDate
  // // }),
  // ignoreEventModalFor7days: thunk(async (actions, payload) => {
  //   // const currentTimeAsMs = new Date().getTime();
  //   // TODO: 1. 기한 정하기 위해 현재 시간 결정
  //   // TODO: 2. -> 1 + 7일 정확히 === dueDate
  // }),

  // // isDueDateOver: computed(state => {
  // //   // TODO: 1. Get the current time of at which the user finished loading app
  // //   // TODO:
  // //   return dueDate => {};
  // // }),
  // isDueDateOver: thunk(async (actions, payload) => {
  //   // TODO: 1. Get the current time of at which the user finished loading app
  //   // TODO:
  //   return dueDate => {};
  // }),
};
