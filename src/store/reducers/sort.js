import { thunkOn, thunk, computed, action } from "easy-peasy";
import { SORT_TYPES, sorterByDate, sorterByLikeCount } from "./sort.type";

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

  onSorted: thunkOn(
    actions => actions.sort,
    (actions, target) => {
      actions.toggle();
    },
  ),

  sort: thunk((actions, payload, { getState, getStoreState }) => {
    const {
      coords,
      depth: { val: depthVal },
    } = getStoreState().swiper;
    const { chapters } = getStoreState().data;
    const { isSortedByLikes } = getState();
    const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords.val;

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

      case 2:
      case 3:
        {
          const head = chapters[d0][d1].child[d2].deck;
          const rests = chapters[d0][d1].child[d2].child.map(ch => ch.deck);
          const slice = [head, ...rests];
          console.log(
            slice.map(ch => ({
              content: ch.content,
              likes: ch.like_count,
              updateDt: ch.updateDt,
            })),
          );

          console.log(
            "--------------------------------------------------------",
          );
          console.log(
            "--------------------------------------------------------",
          );

          const sorted = slice.sort((a, b) => {
            return isSortedByLikes
              ? sorterByDate(a, b, false)
              : sorterByLikeCount(a, b, false);
          });

          console.log(
            sorted.map(ch => ({
              content: ch.content,
              likes: ch.like_count,
              updateDt: ch.updateDt,
            })),
          );
          chapters[d0][d1].child[d2].deck = sorted.shift();
          chapters[d0][d1].child[d2].child.forEach(
            ch => (ch.deck = sorted.shift()),
          );
        }
        break;

      case 4:
      case 5:
        {
          const head = chapters[d0][d1].child[d2].child[d3].child[d4].deck;
          const rests = chapters[d0][d1].child[d2].child[d3].child[
            d4
          ].child.map(ch => ch.deck);
          const slice = [head, ...rests];
          console.log(
            slice.map(ch => ({
              content: ch.content,
              likes: ch.like_count,
              updateDt: ch.updateDt,
            })),
          );

          console.log(
            "--------------------------------------------------------",
          );
          console.log(
            "--------------------------------------------------------",
          );

          const sorted = slice.sort((a, b) => {
            return isSortedByLikes
              ? sorterByDate(a, b, false)
              : sorterByLikeCount(a, b, false);
          });

          console.log(
            sorted.map(ch => ({
              content: ch.content,
              likes: ch.like_count,
              updateDt: ch.updateDt,
            })),
          );
          chapters[d0][d1].child[d2].child[d3].child[d4].deck = sorted.shift();
          chapters[d0][d1].child[d2].child[d3].child[d4].child.forEach(
            ch => (ch.deck = sorted.shift()),
          );
        }
        break;

      case 6:
      case 7:
        {
          const head =
            chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
              .deck;
          const rests = chapters[d0][d1].child[d2].child[d3].child[d4].child[
            d5
          ].child[d6].child.map(ch => ch.deck);
          const slice = [head, ...rests];
          console.log(
            slice.map(ch => ({
              content: ch.content,
              likes: ch.like_count,
              updateDt: ch.updateDt,
            })),
          );

          console.log(
            "--------------------------------------------------------",
          );
          console.log(
            "--------------------------------------------------------",
          );

          const sorted = slice.sort((a, b) => {
            return isSortedByLikes
              ? sorterByDate(a, b, false)
              : sorterByLikeCount(a, b, false);
          });

          console.log(
            sorted.map(ch => ({
              content: ch.content,
              likes: ch.like_count,
              updateDt: ch.updateDt,
            })),
          );
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
            d6
          ].deck = sorted.shift();
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
            d6
          ].child.forEach(ch => (ch.deck = sorted.shift()));
        }
        break;

      case 8:
      case 9:
        {
          const head =
            chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
              .child[d7].child[d8].deck;
          const rests = chapters[d0][d1].child[d2].child[d3].child[d4].child[
            d5
          ].child[d6].child[d7].child[d8].child.map(ch => ch.deck);
          const slice = [head, ...rests];
          console.log(
            slice.map(ch => ({
              content: ch.content,
              likes: ch.like_count,
              updateDt: ch.updateDt,
            })),
          );

          console.log(
            "--------------------------------------------------------",
          );
          console.log(
            "--------------------------------------------------------",
          );

          const sorted = slice.sort((a, b) => {
            return isSortedByLikes
              ? sorterByDate(a, b, false)
              : sorterByLikeCount(a, b, false);
          });

          console.log(
            sorted.map(ch => ({
              content: ch.content,
              likes: ch.like_count,
              updateDt: ch.updateDt,
            })),
          );
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
            d6
          ].child[d7].child[d8].deck = sorted.shift();
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
            d6
          ].child[d7].child[d8].child.forEach(ch => (ch.deck = sorted.shift()));
        }
        break;
    }

    // const head = chapters[d0][d1].deck;
    // const rests = chapters[d0][d1].child.map(e => e.deck);
    // 현재 chapter 의 모든 카드 정보를 array 로 병합
    // const chaptersSlice = [head, ...rests];

    // 현재 sort 기준에 따라서 sort
    // const sorted = chaptersSlice.sort(
    //   isSortedByLikes ? sorterByDate : sorterByLikeCount,
    // );
    // 먼저 머릿글 하나 채움
    // const sortedHead = sorted.shift();
    // chapters[d0][d1].deck = sortedHead;
    // 이후는 그냥 넣기
    // chapters[d0][d1].child.forEach(ch => (ch.deck = sorted.shift()));
  }),
};

export const selectors = {
  isSortedByLikes: state => state.sort.isSortedByLikes,
};

export const actions = {
  sort: actions => actions.sort.sort,
};
