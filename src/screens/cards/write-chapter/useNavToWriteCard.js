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

export const useNavToWriteCard = direction => {
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

  return () => {
    resetTempBlob();
    resetCard();

    switch (depth) {
      case 0:
        if (direction === "left") {
          return impl({
            chapterId: 0,
            order: d1 + 1,
            depth: 1,
          });
        } else {
          return null;
        }

      case 1:
        if (direction === "left") {
          return impl({
            chapterId: +chapters[d0][d1].deck.id,
            order: d2 + 2,
            depth: 2,
          });
        } else {
          return impl({
            chapterId: +categories[d0].id,
            order: 1,
            depth: 1,
          });
        }

      case 2:
        if (direction === "left") {
          return impl({
            chapterId: +chapters[d0][d1].deck.id,
            order: d2 + 3,
            depth: 2,
          });
        } else {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].deck.id,
            order: d2 + 2,
            depth: 3,
          });
        }

      case 3:
        if (direction === "left") {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].child[d3].deck.id,
            order: d1 + d3 + 2,
            depth: 3,
          });
        } else {
          return impl({
            chapterId: +chapters[d0][d1].child[d2].deck.id,
            order: d2 + 2,
            depth: 3,
          });
        }

      case 4:
        if (direction === "left") {
          return impl({
            depth: 4,
          });
        } else {
          return impl({
            depth: 4,
          });
        }

      case 5:
        if (direction === "left") {
          return impl({
            depth: 5,
          });
        } else {
          return impl({
            depth: 5,
          });
        }

      case 6:
        if (direction === "left") {
          return impl({
            depth: 6,
          });
        } else {
          return impl({
            depth: 6,
          });
        }

      case 7:
        if (direction === "left") {
          return impl({
            depth: 7,
          });
        } else {
          return impl({
            depth: 7,
          });
        }

      case 8:
        if (direction === "left") {
          return impl({
            depth: 8,
          });
        } else {
          return impl({
            depth: 8,
          });
        }

      // case 9:
      //   if (direction === "left") {
      //     return null;
      //   } else {
      //     return null;
      //   }
    }
  };
};
