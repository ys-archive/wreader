import { TabRouter } from '@react-navigation/routers';
import { action, computed } from 'easy-peasy';
import { Coordinates, MaxCoordinates } from './swiper.coords';
import { DEPTH_NAME } from './swiper.depth';

export default {
  // model
  depth: {
    val: DEPTH_NAME.CATEGORY,

    set: action((state, payload) => {
      state.val = payload;
    }),

    increment: action(state => {
      ++state.val;
    }),

    decrement: action(state => {
      --state.val;
    }),

    // isFirst: computed(state => state.depth.val === DEPTH_NAME.FIRST),
    // isLast: computed(state => state.depth.val === DEPTH_NAME.MAX),
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

    increment: action((state, payload) => {
      if ('d0' === payload) state.val.setD0(state.val.d0 + 1);
      if ('d1' === payload) state.val.setD1(state.val.d1 + 1);
      if ('d2' === payload) state.val.setD2(state.val.d2 + 1);
      if ('d3' === payload) state.val.setD3(state.val.d3 + 1);
    }),

    decrement: action((state, payload) => {
      if ('d0' === payload) state.val.setD0(state.val.d0 - 1);
      if ('d1' === payload) state.val.setD1(state.val.d1 - 1);
      if ('d2' === payload) state.val.setD2(state.val.d2 - 1);
      if ('d3' === payload) state.val.setD3(state.val.d3 - 1);
    }),

    set: action((state, payload) => {
      state.val = new Coordinates(payload);
    }),

    setMax: action((state, payload) => {
      const { d0, d1, d2, d3 } = state.val;

      if ('d0' in payload) {
        const categories = payload.d0;
        state.max.setD0(categories.length);
      }

      if ('d1' in payload) {
        const chapters = payload.d1;
        state.max.setD1(chapters[d0].length);
      }

      if ('d2' in payload) {
        const chapters = payload.d2;
        // console.log(chapters);
        state.max.setD2(chapters[d0][d1].child.length);
      }

      if ('d3' in payload) {
        const chapters = payload.d3;
        state.max.setD3(chapters[d0][d1].child[d2].child.length);
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
