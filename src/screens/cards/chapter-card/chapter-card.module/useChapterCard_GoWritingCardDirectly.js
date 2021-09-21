import { Alert } from '#components/alert';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

import { useStoreState } from 'easy-peasy';
import { selSwiper, selAuth, selData } from '#store/selectors';
import { DEPTH_NAME } from '#store/reducers/swiper.depth';

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const coords = useStoreState(selSwiper.coords);
  const depth = useStoreState(selSwiper.depth);
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);

  return {
    categories,
    chapters,
    coords,
    depth,
    isLoggedIn,
  };
};

export const useChapterCard_GoWritingCardDirectly = () => {
  const nav = useNavigation();
  const { categories, chapters, coords, depth, isLoggedIn } = initStates();

  return () => {
    if (!isLoggedIn) {
      Alert('Need Login to write a new card');
      return;
    }

    switch (depth) {
      case DEPTH_NAME.CHAPTER:
      case DEPTH_NAME.USER_CHAPTER:
        nav.navigate(ScreenNames.MainWriteCard, {
          categoryTitle: categories[coords.d0].title,
          categoryId: coords.d0,
          chapterId: +chapters[coords.d0][coords.d1].deck.id,
          order: coords.d1,
          depth: 2,
        });
        break;

      case DEPTH_NAME.NEXT:
        nav.navigate(ScreenNames.MainWriteCard, {
          categoryTitle: categories[coords.d0].title,
          categoryId: +coords.d0,
          chapterId: +chapters[coords.d0][coords.d1].child[coords.d2].deck.id,
          order: coords.d3 + 2,
          depth: 3,
        });
        break;
    }
  };
};
