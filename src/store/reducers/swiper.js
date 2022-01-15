import { action, thunk } from "easy-peasy";
import { Coordinates } from "./swiper.coords";

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

    increment: action((state, payload) => {
      state.val = new Coordinates({
        ...state.val,
        [`d${payload}`]: state.val[`d${payload}`] + 1,
      });
    }),

    decrement: action((state, payload) => {
      state.val = new Coordinates({
        ...state.val,
        [`d${payload}`]: state.val[`d${payload}`] + 1,
      });
    }),

    set: action((state, payload) => {
      state.val = new Coordinates({ ...state.val, ...payload });
    }),

    max: {
      category: 0,
      chapter: 0,
    },

    setMaxChapterFromCategory: thunk(
      (actions, payload, { getState, getStoreState }) => {
        // console.log(getState());
        const {
          val: { d0 },
        } = getState();

        const {
          data: { categories },
        } = getStoreState();

        const { setMax } = actions;

        if (categories | categories.length) {
          return;
        }
        setMax({ chapter: categories[d0].maxLength });
      },
    ),

    setMax: action((state, payload) => {
      if ("category" in payload) {
        state.max.category = payload.category;
      }

      if ("chapter" in payload) {
        state.max.chapter = payload.chapter;
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
  setMaxChapterFromCategory: actions =>
    actions.swiper.coords.setMaxChapterFromCategory,
  setMaxCoords: actions => actions.swiper.coords.setMax,

  resetToStartScreen: actions => actions.swiper.resetToStartScreen,
  moveToFirstInCurrentContext: actions =>
    actions.swiper.moveToFirstInCurrentContext,
};
