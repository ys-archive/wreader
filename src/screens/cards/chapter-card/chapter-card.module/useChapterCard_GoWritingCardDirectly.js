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
        break;

      case 3:
        // d3 는 0 부터 시작!
        impl({
          chapterId: +chapters[d0][d1].child[d2].deck.id,
          order: d2 + 2,
          depth: 3,
        });
        break;
    }
  };
};
