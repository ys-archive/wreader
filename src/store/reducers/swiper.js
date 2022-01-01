import { action, actionOn, computed, thunk, thunkOn } from "easy-peasy";

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
  isEvenDepth: computed(state => state.depth % 2 == 0),

  // max depth
  maxDepth: 10,
  setMaxDepth: action((state, payload) => {
    state.maxDepth = payload;
  }),

  // previous position on the current depth
  prvPos: computed(state => state.pos - 1),
  hasPrv: computed(state => state.pos - 1 > 0),

  // current position on the current depth
  curPos: 0,
  setCurPos: action((state, payload) => {
    state.curPos = payload;
  }),

  // next position on the current depth
  nextPos: computed(state => state.pos + 1),
  hasNext: computed(state => state.pos + 1 > state.maxPos),

  onUpdateDepth: actionOn(
    (actions, storeActions) => [
      actions.increaseDepth,
      actions.decreaseDepth,
      actions.setDepth,
    ],
    (state, target) => {
      const { type, payload, result, error, resolvedTargets } = target;
      state.pos = 0;
      state.prvPos = 0;
      state.nextPos = 0;
    },
  ),

  // max position on the current depth
  maxPos: 0,
  setMaxPos: action((state, payload) => {
    state.maxPos = payload;
  }),

  // swipe
  swipeLeft: thunk((actions, payload, helpers) => {}),
  onSwipeLeft: thunkOn((actions => actions.swiftLeft, (actions, target) => {})),

  swipeRight: thunk((actions, payload, helpers) => {}),
  onSwipeRight: thunkOn(
    (actions => actions.swiftRight, (actions, target) => {}),
  ),

  swipeUp: thunk((actions, payload, helpers) => {}),
  onSwipeUp: thunkOn((actions => actions.swiftUp, (actions, target) => {})),

  swipeDown: thunk((actions, payload, helpers) => {}),
  onSwipeDown: thunkOn((actions => actions.swiftDown, (actions, target) => {})),

  resetToStartScreen: thunk((actions, payload, { getState, getStoreState }) => {
    actions.setDepth(0);
    actions.setPos(0);
  }),

  moveToFirstInCurrentContext: thunk((actions, _, { getState }) => {
    // const {
    //   depth: { val },
    // } = getState();
    // switch (val) {
    //   case 1:
    //     {
    //       actions.coords.set({ d1: 0 });
    //     }
    //     break;
    //   case 2:
    //   case 3:
    //     {
    //       actions.depth.set(2);
    //       actions.coords.set({ d3: 0 });
    //     }
    //     break;
    // }
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
  isEvenDepth: state => state.swiper.isEvenDepth,

  prvPos: state => state.swiper.prvPos,
  hasPrv: state => state.swiper.hasPrv,

  curPos: state => state.swiper.curPos,

  nextPos: state => state.swiper.nextPos,
  hasNext: state => state.swiper.hasNext,

  maxPos: state => state.swiper.maxPos,
};

export const actions = {
  startSwiping: actions => actions.swiper.startSwiping,
  finishSwiping: actions => actions.swiper.finishSwiping,

  setDepth: actions => actions.swiper.setDepth,
  increaseDepth: actions => actions.swiper.increaseDepth,
  decreaseDepth: actions => actions.swiper.decreaseDepth,
  setMaxDepth: actions => actions.swiper.setMaxDepth,

  setCurPos: actions => actions.swiper.setCurPos,
  increasePos: actions => actions.swiper.increasePos,
  decreasePos: actions => actions.swiper.decreasePos,
  setMaxPos: actions => actions.swiper.setMaxPos,

  swipeLeft: actions => actions.swiper.swipeLeft,
  swipeRight: actions => actions.swiper.swipeRight,
  swipeUp: actions => actions.swiper.swipeUp,
  swipeDown: actions => actions.swiper.swipeDown,

  resetToStartScreen: actions => actions.swiper.resetToStartScreen,
  moveToFirstInCurrentContext: actions =>
    actions.swiper.moveToFirstInCurrentContext,
};
