import { action, thunk } from "easy-peasy"
import { Coordinates } from "./swiper.coords"
import { DEPTH_NAME } from "./swiper.depth"

export default {
  // model
  isSwiping: false,

  setSwiping: action((state, payload) => {
    state.isSwiping = payload
  }),

  depth: {
    val: DEPTH_NAME.CATEGORY,

    set: action((state, payload) => {
      state.val = payload
    }),

    increment: action(state => {
      ++state.val
    }),

    decrement: action(state => {
      --state.val
    }),
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
      if ("d0" === payload) {
        state.val = new Coordinates({ ...state.val, d0: state.val.d0 + 1 })
        return
      }

      if ("d1" === payload) {
        state.val = new Coordinates({ ...state.val, d1: state.val.d1 + 1 })
        return
      }

      if ("d2" === payload) {
        state.val = new Coordinates({ ...state.val, d2: state.val.d2 + 1 })
        return
      }

      if ("d3" === payload) {
        state.val = new Coordinates({ ...state.val, d3: state.val.d3 + 1 })
        return
      }

      console.log("cur coords: ", state.val)
    }),

    decrement: action((state, payload) => {
      if ("d0" === payload) {
        state.val = new Coordinates({ ...state.val, d0: state.val.d0 - 1 })
        return
      }

      if ("d1" === payload) {
        state.val = new Coordinates({ ...state.val, d1: state.val.d1 - 1 })
        return
      }

      if ("d2" === payload) {
        state.val = new Coordinates({ ...state.val, d2: state.val.d2 - 1 })
        return
      }

      if ("d3" === payload) {
        state.val = new Coordinates({ ...state.val, d3: state.val.d3 - 1 })
        return
      }

      console.log("cur coords: ", state.val)
    }),

    set: action((state, payload) => {
      state.val = new Coordinates({ ...state.val, ...payload })
    }),

    setMax: action((state, payload) => {
      const { d0, d1, d2, d3 } = state.val

      if ("d0" in payload) {
        const categories = payload.d0
        state.max.setD0(categories.length)
      }

      if ("d1" in payload) {
        const maxLength = payload.d1
        state.max.setD1(maxLength)
        // state.max.setD1(chapters[d0] ? chapters[d0].length : 0);
      }

      if ("d2" in payload) {
        const chapters = payload.d2
        // console.log(chapters);
        state.max.setD2(chapters[d0][d1].child.length)
      }

      if ("d3" in payload) {
        const chapters = payload.d3
        state.max.setD3(chapters[d0][d1].child[d2].child.length)
      }
    }),
  },

  resetToStartScreen: thunk((actions, payload, { getState, getStoreState }) => {
    actions.depth.set(0)
    actions.coords.set({ d0: 0, d1: 0, d2: 0, d3: 0 })
  }),

  moveToFirstInCurrentContext: thunk(
    (actions, payload, { getState, getStoreState }) => {
      const currentDepth = getState().depth.val
      console.log(currentDepth)
      // actions.depth.set(currentDepth)

      switch (currentDepth) {
        case DEPTH_NAME.CHAPTER:
          actions.coords.set({ d1: 0 })
          break

        case DEPTH_NAME.USER_CHAPTER:
          actions.coords.set({ d2: 0 })
          break

        case DEPTH_NAME.NEXT:
          actions.coords.set({ d3: 0 })
          break
      }
    },
  ),
}

export const selectors = {
  isSwiping: state => state.swiper.isSwiping,
  depth: state => state.swiper.depth.val,
  coords: state => state.swiper.coords.val,
  maxCoords: state => state.swiper.coords.max,
}

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
}
