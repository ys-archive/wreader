import { thunkOn, thunk, computed, action, actionOn } from "easy-peasy";
import { SORT_TYPES, sorterByDate, sorterByLikeCount } from "./sort.type";
import { sortByDepth } from "./sort.func";

export default {
  currentSortType: SORT_TYPES.ByLikes,

  toggle: action((state, payload) => {
    switch (state.currentSortType) {
      case SORT_TYPES.ByDate:
        state.currentSortType = SORT_TYPES.ByLikes;
        break;

      case SORT_TYPES.ByLikes:
        state.currentSortType = SORT_TYPES.ByDate;
        break;
    }
  }),

  isSortedByLikes: computed(
    state => state.currentSortType === SORT_TYPES.ByLikes,
  ),

  // toggle sort flag
  onSorted: thunkOn(
    actions => actions.sort,
    (actions, target) => {
      actions.toggle();
    },
  ),

  headChildrenId: undefined,
  setHeadChildrenId: action((state, payload) => {
    state.tempId = payload;
  }),

  // reset headChildrenId
  onIncreaseDepth: actionOn(
    (actions, storeActions) => [
      storeActions.swiper.depth.increment,
      storeActions.swiper.depth.decrement,
    ],
    (state, target) => {
      state.headChildrenId = undefined;
    },
  ),

  onChangeDepth: actionOn(
    (actions, storeActions) => [
      storeActions.data.chapters,
      storeActions.swiper.depth.val,
    ],
    (state, target) => {
      const [chapters, depth] = target.resolvedTargets;

      const children = chapters[d0][d1].child;
      for (let i = 1; i < children.length; ++i) {
        children[i].deck.isHide = true;
      }
    },
  ),

  sort: thunk((actions, payload, { getState, getStoreState }) => {
    const {
      coords,
      depth: { val: depthVal },
    } = getStoreState().swiper;
    const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords.val;
    const {
      data: { chapters },
    } = getStoreState();
    const { isSortedByLikes, headChildrenId } = getState();

    const { setHeadChildrenId } = actions;

    switch (depthVal) {
      case 0:
        break;

      case 1:
        {
          // 해당 챕터만 정렬
          // e.g. chapter1 -> chapter1 머릿글 + 나머지들
          chapters[d0] = chapters[d0].sort(
            isSortedByLikes ? sorterByDate : sorterByLikeCount,
          );
        }
        break;

      default:
        sortByDepth({
          coords: coords.val,
          chapters,
          depth: depthVal,
          setHeadChildrenId,
          headChildrenId,
          isSortedByLikes,
        });
        break;
    }
  }),
};

export const selectors = {
  isSortedByLikes: state => state.sort.isSortedByLikes,
};

export const actions = {
  sort: actions => actions.sort.sort,
};

// case 2:
//   case 3:
//     {
//       const head = chapters[d0][d1].child[d2].deck;

//       if (!headChildrenId) {
//         setHeadChildrenId(head.id);
//       }

//       const rests = chapters[d0][d1].child[d2].child.map(ch => ch.deck);
//       const slice = [head, ...rests];
//       console.log(
//         slice.map(ch => ({
//           content: ch.content,
//           likes: ch.like_count,
//           updateDt: ch.updateDt,
//         })),
//       );

//       console.log(
//         "--------------------------------------------------------",
//       );
//       console.log(
//         "--------------------------------------------------------",
//       );

//       const sorted = slice.sort((a, b) => {
//         return isSortedByLikes
//           ? sorterByDate(a, b, false)
//           : sorterByLikeCount(a, b, false);
//       });

//       console.log(
//         sorted.map(ch => ({
//           content: ch.content,
//           likes: ch.like_count,
//           updateDt: ch.updateDt,
//         })),
//       );

//       const newHead = sorted.shift();

//       for (let i = 1; i < chapters[d0][d1].child.length; i++) {
//         chapters[d0][d1].child[i].deck.isHide =
//           headChildrenId !== newHead.id;
//       }

//       chapters[d0][d1].child[d2].deck = newHead;

//       chapters[d0][d1].child[d2].child.forEach(ch => {
//         const card = sorted.shift();
//         if (!card) {
//           return null;
//         }

//         ch.deck = card;
//         return ch.deck;
//       });
//     }
//     break;

//   case 4:
//   case 5:
//     {
//       const head = chapters[d0][d1].child[d2].child[d3].child[d4].deck;
//       const rests = chapters[d0][d1].child[d2].child[d3].child[
//         d4
//       ].child.map(ch => ch.deck);
//       const slice = [head, ...rests];
//       console.log(
//         slice.map(ch => ({
//           content: ch.content,
//           likes: ch.like_count,
//           updateDt: ch.updateDt,
//         })),
//       );

//       console.log(
//         "--------------------------------------------------------",
//       );
//       console.log(
//         "--------------------------------------------------------",
//       );

//       const sorted = slice.sort((a, b) => {
//         return isSortedByLikes
//           ? sorterByDate(a, b, false)
//           : sorterByLikeCount(a, b, false);
//       });

//       console.log(
//         sorted.map(ch => ({
//           content: ch.content,
//           likes: ch.like_count,
//           updateDt: ch.updateDt,
//         })),
//       );
//       chapters[d0][d1].child[d2].child[d3].child[d4].deck = sorted.shift();
//       chapters[d0][d1].child[d2].child[d3].child[d4].child.forEach(
//         ch => (ch.deck = sorted.shift()),
//       );
//     }
//     break;

//   case 6:
//   case 7:
//     {
//       const head =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .deck;
//       const rests = chapters[d0][d1].child[d2].child[d3].child[d4].child[
//         d5
//       ].child[d6].child.map(ch => ch.deck);
//       const slice = [head, ...rests];
//       console.log(
//         slice.map(ch => ({
//           content: ch.content,
//           likes: ch.like_count,
//           updateDt: ch.updateDt,
//         })),
//       );

//       console.log(
//         "--------------------------------------------------------",
//       );
//       console.log(
//         "--------------------------------------------------------",
//       );

//       const sorted = slice.sort((a, b) => {
//         return isSortedByLikes
//           ? sorterByDate(a, b, false)
//           : sorterByLikeCount(a, b, false);
//       });

//       console.log(
//         sorted.map(ch => ({
//           content: ch.content,
//           likes: ch.like_count,
//           updateDt: ch.updateDt,
//         })),
//       );
//       chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
//         d6
//       ].deck = sorted.shift();
//       chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
//         d6
//       ].child.forEach(ch => (ch.deck = sorted.shift()));
//     }
//     break;

//   case 8:
//   case 9:
//     {
//       const head =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .child[d7].child[d8].deck;
//       const rests = chapters[d0][d1].child[d2].child[d3].child[d4].child[
//         d5
//       ].child[d6].child[d7].child[d8].child.map(ch => ch.deck);
//       const slice = [head, ...rests];
//       console.log(
//         slice.map(ch => ({
//           content: ch.content,
//           likes: ch.like_count,
//           updateDt: ch.updateDt,
//         })),
//       );

//       console.log(
//         "--------------------------------------------------------",
//       );
//       console.log(
//         "--------------------------------------------------------",
//       );

//       const sorted = slice.sort((a, b) => {
//         return isSortedByLikes
//           ? sorterByDate(a, b, false)
//           : sorterByLikeCount(a, b, false);
//       });

//       console.log(
//         sorted.map(ch => ({
//           content: ch.content,
//           likes: ch.like_count,
//           updateDt: ch.updateDt,
//         })),
//       );
//       chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
//         d6
//       ].child[d7].child[d8].deck = sorted.shift();
//       chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
//         d6
//       ].child[d7].child[d8].child.forEach(ch => (ch.deck = sorted.shift()));
//     }
//     break;
// }
