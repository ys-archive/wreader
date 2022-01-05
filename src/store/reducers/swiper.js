import { action, thunk } from "easy-peasy";
import { Coordinates } from "./swiper.coords";
import { DEPTH_NAME } from "./swiper.depth";

export default {
  // model
  isSwiping: false,

  setSwiping: action((state, payload) => {
    state.isSwiping = payload;
  }),

  depth: {
    val: 0,

    set: action((state, payload) => {
      state.val = payload;
    }),

    increment: action(state => {
      ++state.val;
    }),

    decrement: action(state => {
      --state.val;
    }),
  },

  coords: {
    val: new Coordinates({
      d0: 0,
      d1: 0,
      d2: 0,
      d3: 0,
      d4: 0,
      d5: 0,
      d6: 0,
      d7: 0,
      d8: 0,
      d9: 0,
    }),

    max: new Coordinates({
      d0: 0,
      d1: 0,
      d2: 0,
      d3: 0,
      d4: 0,
      d5: 0,
      d6: 0,
      d7: 0,
      d8: 0,
      d9: 0,
    }),

    increment: action((state, payload) => {
      if ("d0" === payload) {
        state.val = new Coordinates({ ...state.val, d0: state.val.d0 + 1 });
        return;
      }

      if ("d1" === payload) {
        state.val = new Coordinates({ ...state.val, d1: state.val.d1 + 1 });
        return;
      }

      if ("d2" === payload) {
        state.val = new Coordinates({ ...state.val, d2: state.val.d2 + 1 });
        return;
      }

      if ("d3" === payload) {
        state.val = new Coordinates({ ...state.val, d3: state.val.d3 + 1 });
        return;
      }

      if ("d4" === payload) {
        state.val = new Coordinates({ ...state.val, d4: state.val.d4 + 1 });
        return;
      }

      if ("d5" === payload) {
        state.val = new Coordinates({ ...state.val, d5: state.val.d5 + 1 });
        return;
      }

      if ("d6" === payload) {
        state.val = new Coordinates({ ...state.val, d6: state.val.d6 + 1 });
        return;
      }

      if ("d7" === payload) {
        state.val = new Coordinates({ ...state.val, d7: state.val.d7 + 1 });
        return;
      }

      if ("d8" === payload) {
        state.val = new Coordinates({ ...state.val, d8: state.val.d8 + 1 });
        return;
      }

      if ("d9" === payload) {
        state.val = new Coordinates({ ...state.val, d9: state.val.d9 + 1 });
        return;
      }

      // console.log("cur coords: ", state.val);
    }),

    decrement: action((state, payload) => {
      if ("d0" === payload) {
        state.val = new Coordinates({ ...state.val, d0: state.val.d0 - 1 });
        return;
      }

      if ("d1" === payload) {
        state.val = new Coordinates({ ...state.val, d1: state.val.d1 - 1 });
        return;
      }

      if ("d2" === payload) {
        state.val = new Coordinates({ ...state.val, d2: state.val.d2 - 1 });
        return;
      }

      if ("d3" === payload) {
        state.val = new Coordinates({ ...state.val, d3: state.val.d3 - 1 });
        return;
      }

      if ("d4" === payload) {
        state.val = new Coordinates({ ...state.val, d4: state.val.d4 - 1 });
        return;
      }

      if ("d5" === payload) {
        state.val = new Coordinates({ ...state.val, d5: state.val.d5 - 1 });
        return;
      }

      if ("d6" === payload) {
        state.val = new Coordinates({ ...state.val, d6: state.val.d6 - 1 });
        return;
      }

      if ("d7" === payload) {
        state.val = new Coordinates({ ...state.val, d7: state.val.d7 - 1 });
        return;
      }

      if ("d8" === payload) {
        state.val = new Coordinates({ ...state.val, d8: state.val.d8 - 1 });
        return;
      }

      if ("d9" === payload) {
        state.val = new Coordinates({ ...state.val, d9: state.val.d9 - 1 });
        return;
      }

      // console.log("cur coords: ", state.val);
    }),

    set: action((state, payload) => {
      state.val = new Coordinates({ ...state.val, ...payload });
    }),

    setMax: action((state, payload) => {
      // const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = state.val;

      if ("d0" in payload) {
        const maxLength = payload.d0;
        state.max.setD0(maxLength);
      }

      if ("d1" in payload) {
        const maxLength = payload.d1;
        state.max.setD1(maxLength);
      }

      if ("d2" in payload) {
        const maxLength = payload.d2;
        state.max.setD2(maxLength);
      }

      if ("d3" in payload) {
        const maxLength = payload.d3;
        state.max.setD3(maxLength);
      }

      if ("d4" in payload) {
        const maxLength = payload.d4;
        state.max.setD4(maxLength);
      }

      if ("d5" in payload) {
        const maxLength = payload.d5;
        state.max.setD5(maxLength);
      }

      if ("d6" in payload) {
        const maxLength = payload.d6;
        state.max.setD6(maxLength);
      }

      if ("d7" in payload) {
        const maxLength = payload.d7;
        state.max.setD7(maxLength);
      }

      if ("d8" in payload) {
        const maxLength = payload.d8;
        state.max.setD8(maxLength);
      }

      if ("d9" in payload) {
        const maxLength = payload.d9;
        state.max.setD9(maxLength);
      }
    }),
  },

  resetToStartScreen: thunk((actions, payload, { getState, getStoreState }) => {
    actions.depth.set(0);
    actions.coords.set({ d0: 0, d1: 0, d2: 0, d3: 0 });
  }),

  moveToFirstInCurrentContext: thunk((actions, _, { getState }) => {
    const {
      depth: { val },
    } = getState();
    switch (val) {
      case 1:
        {
          actions.coords.set({ d1: 0 });
        }
        break;
      case 2:
      case 3:
        {
          actions.depth.set(2);
          actions.coords.set({ d3: 0 });
        }
        break;
    }
    // actions.depth.set(1);
    // actions.coords.set({ d1: 0 });
  }),
};

export const selectors = {
  isSwiping: state => state.swiper.isSwiping,
  depth: state => state.swiper.depth.val,
  coords: state => state.swiper.coords.val,
  maxCoords: state => state.swiper.coords.max,
};

export const actions = {
  setSwiping: actions => actions.swiper.setSwiping,

  setDepth: actions => actions.swiper.depth.set,
  increaseDepth: actions => actions.swiper.depth.increment,
  decreaseDepth: actions => actions.swiper.depth.decrement,

  setCoords: actions => actions.swiper.coords.set,
  increaseCoords: actions => actions.swiper.coords.increment,
  decreaseCoords: actions => actions.swiper.coords.decrement,

  initCoords: actions => actions.swiper.coords.init,
  setMaxCoords: actions => actions.swiper.coords.setMax,

  resetToStartScreen: actions => actions.swiper.resetToStartScreen,
  moveToFirstInCurrentContext: actions =>
    actions.swiper.moveToFirstInCurrentContext,
};
