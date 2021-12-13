import { action, computed, thunk, thunkOn } from "easy-peasy";
import ChapterService from "../../services/ChapterService";
import * as _ from "lodash";

export default {
  categories: [],
  chapters: [],
  pos: 0,
  isNextFetched: false,
  nextDirection: "vertical",
  depth: 0,

  previous: computed(state => {
    if (state.chapters.length === 0) {
      return null;
    }

    const head = state.chapters[state.pos];
    let cur = head[head.pos];
    if (!cur) {
      return null;
    }

    let i = 0;
    if (state.depth === 0) {
      if (head.pos === 0) {
        return null;
      }

      return head[head.pos - 1];
    } else {
      while (i < state.depth - 1) {
        cur = cur.chapters[cur.chapters.pos];
        ++i;
      }

      const prv = cur.chapters[cur.chapters.pos - 1];
      if (!prv) {
        return null;
      }

      cur = prv;
    }

    return cur;
  }),

  current: computed(state => {
    if (state.chapters.length === 0) {
      return null;
    }

    const head = state.chapters[state.pos];
    let cur = head[head.pos];
    if (!cur) {
      return null;
    }

    let i = 0;
    if (state.depth === 0) {
      return head[head.pos];
    } else {
      while (i < state.depth) {
        cur = cur.chapters[cur.chapters.pos];
        ++i;
      }
    }

    return cur;
  }),

  next: computed(state => {
    if (state.chapters.length === 0) {
      return null;
    }

    const head = state.chapters[state.pos];
    let cur = head[head.pos];
    if (!cur) {
      return null;
    }

    let i = 0;
    if (state.depth === 0) {
      if (head.length < head.pos) {
        return null;
      }

      return head[head.pos + 1];
    } else {
      while (i < state.depth - 1) {
        cur = cur.chapters[cur.chapters.pos];
        ++i;
      }

      const nxt = cur.chapters[cur.chapters.pos + 1];
      if (!nxt) {
        return null;
      }

      cur = nxt;
    }

    return cur;
  }),

  commentsUpdated: false,

  updateComments: action(state => {
    state.commentsUpdated = !state.commentsUpdated;
  }),

  // isLoaded: {
  //   default: {
  //     d0: false,
  //     d1: false,
  //     d2: false,
  //     d3: false,
  //   },

  //   val: {
  //     d0: false,
  //     d1: false,
  //     d2: false,
  //     d3: false,
  //   },

  //   startLoading: action((state, payload) => {
  //     if ("d0" === payload) {
  //       state.val.d0 = false;
  //       return;
  //     }

  //     if ("d1" === payload) {
  //       state.val.d1 = false;
  //       return;
  //     }

  //     if ("d2" === payload) {
  //       state.val.d2 = false;
  //       return;
  //     }

  //     if ("d3" === payload) {
  //       state.val.d3 = false;
  //       return;
  //     }
  //   }),

  //   finishLoading: action((state, payload) => {
  //     if ("d0" === payload) {
  //       state.val.d0 = true;
  //       return;
  //     }

  //     if ("d1" === payload) {
  //       state.val.d1 = true;
  //       return;
  //     }

  //     if ("d2" === payload) {
  //       state.val.d2 = true;
  //       return;
  //     }

  //     if ("d3" === payload) {
  //       state.val.d3 = true;
  //       return;
  //     }
  //   }),
  // },

  // hasNew: {
  //   default: {
  //     d0: false,
  //     d1: false,
  //     d2: false,
  //     d3: false,
  //   },

  //   val: {
  //     d0: false,
  //     d1: false,
  //     d2: false,
  //     d3: false,
  //   },

  //   update: action((state, payload) => {
  //     if ("d0" in payload) {
  //       state.val.d0 = payload.d0;
  //       return;
  //     }

  //     if ("d1" in payload) {
  //       state.val.d1 = payload.d1;
  //       return;
  //     }

  //     if ("d2" in payload) {
  //       state.val.d2 = payload.d2;
  //       return;
  //     }

  //     if ("d3" in payload) {
  //       state.val.d3 = payload.d3;
  //       return;
  //     }
  //   }),
  // },

  // isUpdatingAll: false,

  // setUpdateAll: action((state, payload) => {
  //   state.isUpdatingAll = payload;
  // }),

  reset: action(state => {
    state.categories = [];
    state.chapters = [];
    // state.isLoaded.val = state.isLoaded.default;
    state.hasNew.val = state.hasNew.default;
    state.isUpdatingAll = false;
  }),

  resetCategory: action(state => {
    state.categories = [];
  }),

  addCategory: action((state, payload) => {
    const category = payload;
    state.categories = category;

    // 기존 카테고리에 존재 중복 검사
    // const hasFound = state.categories.findIndex(lastCategory =>
    //   _.isEqual(lastCategory.id, category.id),
    // );

    // if (hasFound === -1) {
    // }
  }),

  addChapter: action((state, payload) => {
    const chapters = payload;
    // 다음 children prop + 상태 추가 하여 배열로 map
    const newChapters = chapters.map(chapter =>
      Object.assign(
        {
          chapters: [],
          isNextFetched: false,
          nextDirection: "vertical",
        },
        chapter,
      ),
    );

    // map 된 배열의 기초에 현재 축의 위치 추가
    const card = Object.assign(
      {
        pos: 0,
      },
      newChapters,
    );

    state.chapters.push(card);

    // const hasFound = state.chapters.findIndex(ch =>
    //   _.isEqual(ch.chapter.Id, payload.chapter.Id),
    // );

    // if (hasFound === -1) {
    // }
  }),

  fetchOneChapter_internal: action((state, payload) => {
    const {
      coords: { d0, d1 },
      newChapter,
    } = payload;
    const origPos = state.chapters[d0][d1];

    console.log("[data.fetchOneChapter] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneUserChapter_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2 },
      newChapter,
    } = payload;

    const origPos = state.chapters[d0][d1].child[d2];
    console.log("found outdated user chapter : ", origPos.deck);

    if (newChapter !== undefined) origPos.deck = newChapter;

    // let origPos = undefined

    // const origPosIdx = state.chapters[d0][d1].child.findIndex(
    //   i => +i.id === +retryId,
    // )

    // origPos = state.chapters[d0][d1].child[origPosIdx]
    // // if (origPosIdx === -1) {
    // //   origPos = state.chapters[d0][d1]
    // // } else {
    // // }

    // console.log("[data.fetchOneUserChapter] OUTDATED\n", origPos.deck, "\n")

    // if (newChapter !== undefined) origPos.deck = newChapter
  }),

  fetchOneNext_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2, d3 },
      newChapter,
    } = payload;
    const origPos = state.chapters[d0][d1].child[d2].child[d3];

    console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),
};

export const selectors = {
  categories: state => state.data.categories,
  chapters: state => state.data.chapters,
  previous: state => state.data.previous,
  current: state => state.data.current,
  depth: state => state.data.depth,
  next: state => state.data.next,
  commentsUpdated: state => state.data.commentsUpdated,
};

export const actions = {
  updateComments: state => state.data.updateComments,
  reset: actions => actions.data.reset,
  addCategory: actions => actions.data.addCategory,
  addChapter: actions => actions.data.addChapter,
};
