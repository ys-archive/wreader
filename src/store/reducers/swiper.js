import { action, actionOn, computed, thunk, thunkOn } from "easy-peasy";
import * as ScreenNames from "../../navigators/ScreenNames";
import { navigateToWriteNewCategoryCard } from "../../screens/cards/write-chapter/WriteChapterCard.navigate";

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
  resetDepth: action((state, payload) => {
    state.depth = 0;
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
  resetCurPos: action((state, payload) => {
    state.curPos = 0;
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
  swipeLeft: thunk(
    (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const { pos, swipe, Alert, nav } = payload;
      const { depth } = getState();

      const {
        data: { hasNext, hasChapters, currentCategory },
      } = getStoreState();

      const {
        data: { loadChaptersAsync },
        image: { resetTempBlob, resetCard },
      } = getStoreActions();

      const { increasePos, increaseDepth } = actions;

      switch (pos) {
        case "category":
          if (!hasChapters) {
            console.log("현재 카테고리에 챕터가 없습니다. 새 카드 작성!");
            resetTempBlob();
            resetCard();
            navigateToWriteNewCategoryCard(nav, {
              category: currentCategory,
              depth,
            });
            return;
          }

          swipe("left", () => {
            increaseDepth();
          });
          break;

        case "even":
          swipe("left", () => {
            loadChaptersAsync(() => {
              increasePos();
            });
          });
          break;

        case "odd":
          swipe("left", () => {
            increaseDepth();
          });
          break;
      }
    },
  ),

  swipeRight: thunk(
    (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const { pos, swipe, Alert } = payload;
      const {
        data: { hasNext },
      } = getStoreState();
      const { decreasePos, decreaseDepth } = actions;

      switch (pos) {
        case "even":
          swipe("right", () => {
            decreasePos();
          });
          break;

        case "odd":
          let after = null;
          if (depth === 1) {
            after = () => {
              decreaseDepth();
            };
          } else {
          }

          swipe("right", after);
          break;
      }
    },
  ),

  swipeUp: thunk(
    (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const { pos, nav, swipe, Alert } = payload;
      const {
        data: { hasNext },
      } = getStoreState();
      const {
        data: { loadChaptersAsync },
      } = getStoreActions();
      const { increasePos } = actions;

      switch (pos) {
        case "category":
          if (!hasNext) {
            Alert("마지막 카테고리!", "이전 카테고리로 돌아가기", () =>
              swipe("down", () => {
                console.log("마지막 카테C고리!, 이전 카드로 돌아감!");
                decreaseCoords();
              }),
            );
            return;
          }

          swipe("up", () => {
            increasePos();
            // loadChaptersAsync(() => {
            // });
          });
          break;

        case "even":
          swipe("up", () => {
            if (hasNext) {
              increasePos();
            } else {
              // todo: write a new card
            }
          });
          break;

        case "odd":
          swipe("up", () => {
            if (hasNext) {
              increasePos();
            } else {
              // todo: write a new card
            }
          });
          break;
      }
    },
  ),

  swipeDown: thunk(
    (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const { pos, swipe, Alert } = payload;
      const {
        data: { hasPrv },
      } = getStoreState();
      const {
        data: { loadChaptersAsync },
      } = getStoreActions();
      const { decreasePos, decreaseDepth } = actions;

      switch (pos) {
        case "category":
          if (!hasPrv) {
            Alert("You are at the first category", "continue");
            console.log("첫 카테고리에서 윗 카드가 없음");
            return;
          }

          swipe("down", () => {
            loadChaptersAsync(() => {
              decreasePos();
            });
          });
          break;

        case "even":
          swipe("down", () => {
            if (hasPrv) {
              decreasePos();
            }
          });
          break;

        case "odd":
          swipe("down", () => {
            if (hasPrv) {
              decreasePos();
            } else {
              decreaseDepth();
            }
          });
          break;
      }
    },
  ),

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
