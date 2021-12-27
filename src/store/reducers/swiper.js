import { action, computed, thunk } from "easy-peasy";
import { Coordinates } from "./swiper.coords";
import { DEPTH_NAME } from "./swiper.depth";

export default {
  // swipe status
  isSwiping: false,

  startSwiping: action(state => {
    state.isSwiping = true;
  }),
  finishSwiping: action(state => {
    state.isSwiping = false;
  }),

  // depth
  depth: 0,
  setDepth: action((state, payload) => {
    state.depth = payload;
  }),
  isReachedAtMaxDepth: computed(state => state.depth + 1 >= state.maxDepth),
  increaseDepth: action(state => {
    state.depth = state.depth + 1;
  }),
  isReachedAtMinDepth: computed(state => state.depth - 1 <= 0),
  decreaseDepth: action(state => {
    state.depth = state.depth - 1;
  }),

  // max depth
  maxDepth: 10,
  setMaxDepth: action((state, payload) => {
    state.maxDepth = payload;
  }),

  // previous position on the current depth
  prvPos: computed(state => state.pos - 1),
  hasPrv: computed(state => state.pos - 1 > 0),

  // current position on the current depth
  pos: 0,

  // next position on the current depth
  nextPos: computed(state => state.pos + 1),
  hasNext: computed(state => state.pos + 1 > state.maxPos),

  // max position on the current depth
  maxPos: 0,
  setMaxPos: action((state, payload) => {
    state.maxPos = payload;
  }),

  // depth: {
  //   val: DEPTH_NAME.CATEGORY,

  //   set: action((state, payload) => {
  //     state.val = payload;
  //   }),

  //   increment: action(state => {
  //     ++state.val;
  //   }),

  //   decrement: action(state => {
  //     --state.val;
  //   }),
  // },

  // coords: {
  //   val: new Coordinates({
  //     d0: 0,
  //     d1: 0,
  //     d2: 0,
  //     d3: 0,
  //   }),

  //   max: new Coordinates({
  //     d0: 0,
  //     d1: 0,
  //     d2: 0,
  //     d3: 0,
  //   }),

  //   increment: action((state, payload) => {
  //     if ("d0" === payload) {
  //       state.val = new Coordinates({ ...state.val, d0: state.val.d0 + 1 });
  //       return;
  //     }

  //     if ("d1" === payload) {
  //       state.val = new Coordinates({ ...state.val, d1: state.val.d1 + 1 });
  //       return;
  //     }

  //     if ("d2" === payload) {
  //       state.val = new Coordinates({ ...state.val, d2: state.val.d2 + 1 });
  //       return;
  //     }

  //     if ("d3" === payload) {
  //       state.val = new Coordinates({ ...state.val, d3: state.val.d3 + 1 });
  //       return;
  //     }

  //     console.log("cur coords: ", state.val);
  //   }),

  //   decrement: action((state, payload) => {
  //     if ("d0" === payload) {
  //       state.val = new Coordinates({ ...state.val, d0: state.val.d0 - 1 });
  //       return;
  //     }

  //     if ("d1" === payload) {
  //       state.val = new Coordinates({ ...state.val, d1: state.val.d1 - 1 });
  //       return;
  //     }

  //     if ("d2" === payload) {
  //       state.val = new Coordinates({ ...state.val, d2: state.val.d2 - 1 });
  //       return;
  //     }

  //     if ("d3" === payload) {
  //       state.val = new Coordinates({ ...state.val, d3: state.val.d3 - 1 });
  //       return;
  //     }

  //     console.log("cur coords: ", state.val);
  //   }),

  //   set: action((state, payload) => {
  //     state.val = new Coordinates({ ...state.val, ...payload });
  //   }),

  //   setMax: action((state, payload) => {
  //     const { d0, d1, d2, d3 } = state.val;

  //     if ("d0" in payload) {
  //       const categories = payload.d0;
  //       state.max.setD0(categories.length);
  //     }

  //     if ("d1" in payload) {
  //       const maxLength = payload.d1;
  //       state.max.setD1(maxLength);
  //       // state.max.setD1(chapters[d0] ? chapters[d0].length : 0);
  //     }

  //     if ("d2" in payload) {
  //       const chapters = payload.d2;
  //       // console.log(chapters);
  //       state.max.setD2(chapters[d0][d1].child.length);
  //     }

  //     if ("d3" in payload) {
  //       const chapters = payload.d3;
  //       state.max.setD3(chapters[d0][d1].child[d2].child.length);
  //     }
  //   }),
  // },

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
  isReachedAtMaxDepth: state => state.swiper.isReachedAtMaxDepth,
  isReachedAtMinDepth: state => state.swiper.isReachedAtMinDepth,

  depth: state => state.swiper.depth,
  maxDepth: state => state.swiper.maxDepth,

  prvPos: state => state.swiper.prvPos,
  hasPrv: state => state.swiper.hasPrv,

  curPos: state => state.swiper.curPos,

  nextPos: state => state.swiper.nextPos,
  hasNext: state => state.swiper.hasNext,

  maxPos: state => state.swiper.maxPos,

  // depth: state => state.swiper.depth.val,
  // coords: state => state.swiper.coords.val,
  // maxCoords: state => state.swiper.coords.max,
};

export const actions = {
  // setSwiping: actions => actions.swiper.setSwiping,
  startSwiping: actions => actions.swiper.startSwiping,
  finishSwiping: actions => actions.swiper.finishSwiping,

  setDepth: actions => actions.swiper.depth.set,
  increaseDepth: actions => actions.swiper.depth.increment,
  decreaseDepth: actions => actions.swiper.depth.decrement,
  setMaxDepth: actions => actions.swiper.setMaxDepth,

  setPos: actions => actions.swiper.setPos,
  increasePos: actions => actions.swiper.increasePos,
  decreasePos: actions => actions.swiper.decreasePos,

  // setCoords: actions => actions.swiper.coords.set,
  // increaseCoords: actions => actions.swiper.coords.increment,
  // decreaseCoords: actions => actions.swiper.coords.decrement,

  // initCoords: actions => actions.swiper.coords.init,
  // setMaxCoords: actions => actions.swiper.coords.setMax,

  setMaxPos: actions => actions.swiper.setMaxPos,

  resetToStartScreen: actions => actions.swiper.resetToStartScreen,
  moveToFirstInCurrentContext: actions =>
    actions.swiper.moveToFirstInCurrentContext,
};
