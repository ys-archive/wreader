import { action, computed } from 'easy-peasy';

const model = {
  isAutoLogin: false,
  // 첫 구동인지 확인하는 플래그
  isFirstExecute: true,
  // TODO: 일주일간 보지않게(Event Modal) ->  Persisted 으로 구현, react-native-mmkv 사용
  dueDate: undefined,
};

export default {
  model,

  enableAutoLogin: action(state => {
    state.model.isAutoLogin = true;
  }),

  disableAutoLogin: action(state => {
    state.model.isAutoLogin = false;
  }),

  toggleAutoLogin: action(state => {
    state.model.isAutoLogin = !state.model.isAutoLogin;
  }),

  executeAppFirstTime: action(state => {
    state.model.isFirstExecute = false;
  }),

  ignoreEventModalFor1day: action(state => {
    // const currentTimeAsMs = new Date().getTime();
    // TODO: 1. 기한 정하기 위해 현재 시간 결정
    // TODO: 2. -> 1일 정확히 === dueDate
  }),

  ignoreEventModalFor7days: action(state => {
    // const currentTimeAsMs = new Date().getTime();
    // TODO: 1. 기한 정하기 위해 현재 시간 결정
    // TODO: 2. -> 1 + 7일 정확히 === dueDate
  }),

  isDueDateOver: computed(state => {
    // TODO: 1. Get the current time of at which the user finished loading app
    // TODO:
    return (dueDate) => {

    };
  }),
};
