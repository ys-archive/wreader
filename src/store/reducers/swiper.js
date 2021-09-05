import { action, computed } from 'easy-peasy';
import { Coordinates, MaxCoordinates } from './swiper.coords';
import { DEPTH_NAME } from './swiper.depth';

export default {
  // model
  depth: {
    val: DEPTH_NAME.CATEGORY,

    set: action((state, payload) => {
      state.depth.val = payload;
    }),

    increment: action(state => {
      ++state.depth.val;
    }),

    decrement: action(state => {
      --state.depth.val;
    }),

    isFirst: computed(state => state.depth.val === DEPTH_NAME.FIRST),
    isLast: computed(state => state.depth.val === DEPTH_NAME.MAX),
  },

  coords: {
    val: new Coordinates({
      d0: 0,
      d1: 0,
      d2: 0,
      d3: 0,
    }),

    max: new Coordinates({
      d0: 0,
      d1: 0,
      d2: 0,
      d3: 0,
    }),

    categories: undefined,
    chapters: undefined,

    init: action((state, payload) => {
      state.coords.categories = payload.categories;
      state.coords.chapters = payload.chapters;
    }),

    increment: action((state, payload) => {
      if ('d0' === payload) state.coords.val.setD0(state.coords.val.d0 + 1);
      if ('d1' === payload) state.coords.val.setD1(state.coords.val.d1 + 1);
      if ('d2' === payload) state.coords.val.setD2(state.coords.val.d2 + 1);
      if ('d3' === payload) state.coords.val.setD3(state.coords.val.d3 + 1);
    }),

    decrement: action((state, payload) => {
      if ('d0' === payload) state.coords.val.setD0(state.coords.val.d0 - 1);
      if ('d1' === payload) state.coords.val.setD1(state.coords.val.d1 - 1);
      if ('d2' === payload) state.coords.val.setD2(state.coords.val.d2 - 1);
      if ('d3' === payload) state.coords.val.setD3(state.coords.val.d3 - 1);
    }),

    set: actions((state, payload) => {
      state.coords.val = new Coordinates(payload);
    }),

    setMax: action((state, payload) => {
      const { d0, d1, d2, d3 } = state.coords.val;

      if ('d0' === payload) {
        state.coords.max.setD0(state.coords.categories.length);
      }

      if ('d1' === payload) {
        state.coords.max.setD1(state.coords.chapters[d0].length);
      }

      if ('d2' === payload) {
        state.coords.max.setD2(state.coords.chapters[d0][d1].child.length);
      }

      if ('d3' === payload) {
        state.coords.max.setD3(
          state.coords.chapters[d0][d1].child[d2].child.length,
        );
      }
    }),
  },
};

export const selectors = {
  depth: state => state.swiper.depth.val,

  coords: state => state.swiper.coords.val,
  maxCoords: state => state.swiper.coords.max,
};

export const actions = {
  setDepth: actions => actions.swiper.depth.set,
  increaseDepth: actions => actions.swiper.depth.increment,
  decreaseDepth: actions => actions.swiper.depth.decrement,

  setCoords: actions => actions.swiper.coords.set,
  incrementCoords: actions => actions.swiper.coords.increment,
  decrementCoords: actions => actions.swiper.coords.decrement,

  initCoords: actions => actions.swiper.coords.init,
  setMaxCoords: actions => actions.swiper.coords.setMax,
};
