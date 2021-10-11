import { Alert, AlertRequireLogin } from '../../../../components/alert';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { selAuth, selImage, selSwiper } from '#store/selectors';
import { actData } from '#store/actions';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../../../navigators/ScreenNames';

import { ChapterService } from '#services';
import { DEPTH_NAME } from '#store/reducers/swiper.depth';

const initStates = () => {
  // selectors
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);
  const userId = useStoreState(selAuth.userId);
  const profile = useStoreState(selImage.profile);

  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);

  // actions
  const fetchOneChapter = useStoreActions(actData.fetchOneChapter);
  const fetchOneUserChapter = useStoreActions(actData.fetchOneUserChapter);
  const fetchOneNext = useStoreActions(actData.fetchOneNext);

  return {
    isLoggedIn,
    userId,
    profile,
    depth,
    coords,
    fetchOneChapter,
    fetchOneUserChapter,
    fetchOneNext,
  };
};

export const useChapterCardLike = (chapterId, isLike, likeCount) => {
  const {
    isLoggedIn,
    userId,
    depth,
    fetchOneChapter,
    fetchOneUserChapter,
    fetchOneNext,
  } = initStates();

  const nav = useNavigation();

  return async () => {
    if (!isLoggedIn) {
      Alert('Need Login to like this card', 'close', () =>
        nav.navigate(ScreenNames.SigninStack),
      );
      return;
    }

    // console.log('userID: ', userId);
    // 이미 좋아요 했음
    if (isLike === 1) {
      console.log('UNLIKE! chapterID: ', chapterId, ', likeCount: ', likeCount);
      await ChapterService.DELETE_unlikeChapter(chapterId, userId);
    } else {
      console.log('LIKE! chapterID: ', chapterId, ', likeCount: ', likeCount);
      await ChapterService.POST_likeChapter(chapterId, userId);
    }

    switch (depth) {
      case DEPTH_NAME.CHAPTER:
        fetchOneChapter();
        break;

      case DEPTH_NAME.USER_CHAPTER:
        fetchOneUserChapter();
        break;

      case DEPTH_NAME.NEXT:
        fetchOneNext();
        break;
    }
  };
};
