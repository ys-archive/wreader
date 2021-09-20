import { useStoreActions, useStoreState } from 'easy-peasy';
import { selAuth, selImage, selSwiper } from '../../../../../store/selectors';
import { actData } from '../../../../../store/actions';

import { ChapterService } from '../../../../../services';
import { DEPTH_NAME } from '../../../../../store/reducers/swiper.depth';

const initStates = () => {
  // selectors
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);
  const userId = useStoreState(selAuth.userId);
  const profile = useStoreState(selImage.profile);

  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);

  // actions
  const fetchOneChapter = useStoreActions(actData.fetchOneChapter);
  const updateHasNew = useStoreActions(actData.updateHasNew);
  const fetchOneUserChapter = useStoreActions(actData.fetchOneUserChapter);
  const fetchOneNext = useStoreActions(actData.fetchOneNext);

  return {
    isLoggedIn,
    userId,
    profile,
    depth,
    coords,
    fetchOneChapter,
    updateHasNew,
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
    updateHasNew,
    fetchOneUserChapter,
    fetchOneNext,
  } = initStates();

  return async () => {
    if (!isLoggedIn) {
      Alert('Need Login to write a new card');
      return;
    }

    console.log('userID: ', userId);
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
        // updateHasNew({ d0: true });
        // setTimeout(() => {
        //   updateHasNew({ d1: true });
        // }, 500);  
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
