import { Alert } from "#components/alert";

import { useNavigation } from "@react-navigation/native";
import * as ScreenNames from "#navigators/ScreenNames";

import { useStoreActions, useStoreState } from "easy-peasy";
import { selSwiper, selAuth, selData } from "../../../../store/selectors";
import { actImage } from "../../../../store/actions";

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
    coords: { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 },
    depth,
    isLoggedIn,
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
    if (!isLoggedIn) {
      Alert("Need Login to write a new card", "close", () =>
        nav.navigate(ScreenNames.SigninStack),
      );
      return;
    }

    resetTempBlob();
    resetCard();

    switch (depth) {
      case 1:
        // 챕터 맨뒤에 직접 쓰기
        impl({
          chapterId: 0,
          order: 1,
          depth: 1,
        });
        break;

      case 2:
        impl({
          chapterId: +chapters[d0][d1].child[d2].deck.id,
          order: d2 + 2,
          depth: 3,
        });
        break;

      case 3:
        // d3 는 0 부터 시작!
        impl({
          chapterId: +chapters[d0][d1].child[d2].deck.id,
          order: d2 + 2,
          depth: 3,
        });
        break;

      case 4:
        impl({
          chapterId: +chapters[d0][d1].child[d2].child[d3].child[d4].deck.id,
          order: d2 + 2 + d4 + 1,
          depth: 5,
        });
        break;

      case 5:
        impl({
          chapterId: +chapters[d0][d1].child[d2].child[d3].child[d4].deck.id,
          order: d2 + 2 + d4 + 1,
          depth: 5,
        });
        break;

      case 6:
        impl({
          chapterId:
            +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
              .deck.id,
          order: d2 + 2 + d4 + 2 + d6,
          depth: 7,
        });
        break;

      case 7:
        impl({
          chapterId:
            +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
              .deck.id,
          order: d2 + 2 + d4 + 2 + d6,
          depth: 7,
        });
        break;

      case 8:
        impl({
          chapterId:
            +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
              .child[d7].child[d8].deck.id,
          order: d2 + 2 + d4 + 2 + d6 + 1 + d8,
          depth: 9,
        });
        break;

      case 9:
        impl({
          chapterId:
            +chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
              .child[d7].child[d8].deck.id,
          order: d2 + 2 + d4 + 2 + d6 + 1 + d8,
          depth: 9,
        });
        break;
    }
  };
};
