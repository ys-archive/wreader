import { useCallback } from "react";
import { Alert } from "#components/alert";

import { useNavigation } from "@react-navigation/native";
import * as ScreenNames from "#navigators/ScreenNames";

import { useStoreActions, useStoreState } from "easy-peasy";
import { selSwiper, selAuth, selData } from "../../../../store/selectors";
import { actImage } from "../../../../store/actions";
import { DEPTH_NAME } from "#store/reducers/swiper.depth";

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const coords = useStoreState(selSwiper.coords);
  const depth = useStoreState(selSwiper.depth);
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);
  const resetTempBlob = useStoreActions(actImage.resetTempBlob);
  const resetCard = useStoreActions(actImage.resetCard);

  return {
    categories,
    chapters,
    coords,
    depth,
    isLoggedIn,
    resetTempBlob,
    resetCard,
  };
};

export const useChapterCard_GoWritingCardDirectly = () => {
  const nav = useNavigation();
  const {
    categories,
    chapters,
    coords,
    depth,
    isLoggedIn,
    resetTempBlob,
    resetCard,
  } = initStates();

  return useCallback(() => {
    if (!isLoggedIn) {
      Alert("Need Login to write a new card", "close", () =>
        nav.navigate(ScreenNames.SigninStack),
      );
      return;
    }

    resetTempBlob();
    resetCard();

    switch (depth) {
      case DEPTH_NAME.CHAPTER:
        // 챕터 맨뒤에 직접 쓰기
        nav.navigate(ScreenNames.MainWriteCard, {
          categoryTitle: categories[coords.d0].title,
          categoryId: coords.d0,
          chapterId: 0,
          order: 1,
          depth: DEPTH_NAME.CHAPTER,
        });
        break;

      case DEPTH_NAME.USER_CHAPTER:
        nav.navigate(ScreenNames.MainWriteCard, {
          categoryTitle: categories[coords.d0].title,
          categoryId: coords.d0,
          chapterId: +chapters[coords.d0][coords.d1].deck.id,
          order: chapters[coords.d0][coords.d1].child.length + 2,
          depth: DEPTH_NAME.USER_CHAPTER,
        });
        break;

      case DEPTH_NAME.NEXT:
        // d3 는 0 부터 시작!
        nav.navigate(ScreenNames.MainWriteCard, {
          categoryTitle: categories[coords.d0].title,
          categoryId: +coords.d0,
          chapterId: +chapters[coords.d0][coords.d1].child[coords.d2].deck.id,
          order: coords.d2 + 2,
          depth: DEPTH_NAME.NEXT,
        });
        break;
    }
  }, [categories, chapters, coords, depth, isLoggedIn]);
};
