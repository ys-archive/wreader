import { useNavigation } from "@react-navigation/native";
import { useStoreState, useStoreActions } from "easy-peasy";
import { selData, selSwiper } from "../../../store/selectors";

import * as ScreenNames from "../../../navigators/ScreenNames";
import { actImage } from "../../../store/actions";

const initStates = () => {
  // selectors
  // - data
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);

  // - swiper
  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);

  // actions
  // - image
  const resetTempBlob = useStoreActions(actImage.resetTempBlob);
  const resetCard = useStoreActions(actImage.resetCard);

  return {
    categories,
    chapters,
    depth,
    coords,
    resetTempBlob,
    resetCard,
  };
};

export const useNavToWriteCard = () => {
  const nav = useNavigation();

  const {
    categories,
    chapters,
    depth,
    coords: { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 },
    resetTempBlob,
    resetCard,
  } = initStates();

  const impl = params =>
    nav.navigate(ScreenNames.MainWriteCard, {
      categoryTitle: categories[d0].title,
      categoryId: d0,
      ...params,
    });

  let orderBase = undefined;

  return direction => {
    resetTempBlob();
    resetCard();

    switch (depth) {
      case 0:
        orderBase = d1 + 1;
        if (direction === "left") {
          return impl({
            chapterId: 0,
            order: orderBase,
            depth: 1,
          });
        } else {
          return null;
        }

      case 1:
        orderBase = d2 + 1;
        if (direction === "left") {
          return impl({
            chapterId: +chapters[d0][d1].deck.id,
            order: orderBase + 1,
            depth: 2,
          });
        } else {
          return impl({
            chapterId: 0,
            order: orderBase,
            depth: 1,
          });
        }

      case 2:
        orderBase = d2 + 2;
        if (direction === "left") {
          return impl({
            chapterId: +chapters[d0][d1].deck.id,
            order: orderBase + 1,
            depth: 2,
          });
        } else {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].deck.id,
            order: orderBase,
            depth: 3,
          });
        }

      case 3:
        orderBase = d2 + 2;
        if (direction === "left") {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].child[d3].deck.id,
            order: orderBase + 1,
            depth: 4,
          });
        } else {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].deck.id,
            order: orderBase,
            depth: 3,
          });
        }

      case 4:
        orderBase = d2 + 2 + d4 + 1;
        if (direction === "left") {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].child[d3].deck.id,
            order: orderBase + 1,
            depth: 4,
          });
        } else {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].child[d3].child[d4].deck.id,
            order: orderBase,
            depth: 5,
          });
        }

      case 5:
        orderBase = d2 + 2 + d4 + 1;
        if (direction === "left") {
          return impl({
            chapterId:
              +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].deck.id,
            order: orderBase + 1,
            depth: 6,
          });
        } else {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].child[d3].child[d4].deck.id,
            order: orderBase,
            depth: 5,
          });
        }

      case 6:
        orderBase = d2 + 2 + d4 + 2 + d6;
        if (direction === "left") {
          return impl({
            chapterId:
              +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].deck.id,
            order: orderBase + 1,
            depth: 6,
          });
        } else {
          return impl({
            chapterId:
              +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
                d6
              ].deck.id,
            order: orderBase,
            depth: 7,
          });
        }

      case 7:
        orderBase = d2 + 2 + d4 + 2 + d6;
        if (direction === "left") {
          return impl({
            chapterId:
              +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
                d6
              ].child[d7].deck.id,
            order: orderBase + 1,
            depth: 8,
          });
        } else {
          return impl({
            chapterId:
              +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
                d6
              ].deck.id,
            order: orderBase,
            depth: 7,
          });
        }

      case 8:
        orderBase = d2 + 2 + d4 + 2 + d6 + 1 + d8;
        if (direction === "left") {
          return impl({
            chapterId:
              +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
                d6
              ].child[d7].deck.id,
            order: orderBase + 1,
            depth: 8,
          });
        } else {
          return impl({
            chapterId:
              +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
                d6
              ].child[d7].child[d8].deck.id,
            order: orderBase,
            depth: 9,
          });
        }

      case 9:
        orderBase = d2 + 2 + d4 + 2 + d6 + 1 + d8;
        if (direction === "left") {
          return null;
        } else {
          return impl({
            chapterId:
              +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[
                d6
              ].child[d7].child[d8].deck.id,
            order: orderBase,
            depth: 9,
          });
        }
    }
  };
};
