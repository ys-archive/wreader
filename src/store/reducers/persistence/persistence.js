import { action } from 'easy-peasy';
import * as mmkv from 'react-native-mmkv'; // TODO: Official Doc 가보기

const model = {
  isAutoLogin: false,
  // 첫 구동인지 확인하는 플래그
  isFirstExecute: true,
  // TODO: 일주일간 보지않게(Event Modal) ->  Persisted 으로 구현, react-native-mmkv 사용
  dueDate: undefined,
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

  executeAppFirstTime: action(state => {
    state.model.isFirstExecute = false;
  }),

  ignoreEventModalFor7days: actions(state => {
    const currentTimeAsMs = new Date().getTime();
    // TODO: 1. Retrieve the current time to determine the due date
    // TODO: 2.
  }),

  isDueDateOver: computed(state => {
    // TODO: 1. Get the current time of at which the user finished loading app
    // TODO:
  }),
};
