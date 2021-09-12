import React from 'react';
import { asyncForEach } from '../../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selAuth, selSwiper } from '../../store/selectors';
import { actData, actSwiper } from '../../store/actions';

import ChapterService from '../../services/ChapterService';
import { Coordinates } from '../../store/reducers/swiper.coords';

const initStates = () => {
  // selectors
  const userId = useStoreState(selAuth.userId);

  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);
  const hasLike = useStoreState(selData.hasLike);
  const hasNew = useStoreState(selData.hasNew);

  const coords = useStoreState(selSwiper.coords);

  // actions
  // - data
  const addChapterChild = useStoreActions(actData.addChapterChild);
  const finishLoading = useStoreActions(actData.finishLoading);
  const updateHasNew = useStoreActions(actData.updateHasNew);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    userId,

    chapters,
    isLoaded,
    hasNew,
    hasLike,

    coords,

    addChapterChild,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  };
};

export const useNextFetch = () => {
  const {
    userId,

    chapters,
    isLoaded,
    hasNew,
    hasLike,

    coords,

    addChapterChild,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  } = initStates();

  React.useEffect(() => {
    (async function fetchNext() {
      if (!isLoaded.d2) return;
      if (!hasNew.d3) return;
      if (!chapters || chapters.length === 0) return;
      console.log('fetching NEXT CHAPTERS');

      // group_index 0 부터 저장
      // await asyncForEach(chapters, async chapter => {
      //   if (!chapter || chapter.length === 0) return;

      // });
      const target = chapters[coords.d0][coords.d1].child[coords.d2];
      console.log('target ---> ', target);

      const { data } = await ChapterService.GET_getChapter(
        +target.deck.id,
        +userId,
      );

      if (data.item.length === 1) {
        addChapterChild({ deck: data.item[0] });
      } else if (data.item.length >= 2) {
        data.item.forEach(data => {
          addChapterChild({ deck: data });
        });
      }

      // 로딩 끝
      updateHasNew({ d3: false });
      finishLoading('d3');
    })();
  }, [isLoaded.d2, hasLike.d3, hasNew.d3]);

  React.useEffect(() => {
    if (!isLoaded.d3) return;

    setMaxCoords({ d3: chapters });
  }, [isLoaded.d3]);
};

// const fetchRecursively = async (arr, userId, addChapterChild) => {
//   await asyncForEach(arr, async item => {
//     const { data } = await ChapterService.GET_getChapter(
//       +item.deck.id,
//       +userId,
//     );

//     if (data.item.length === 1) {
//       addChapterChild({ deck: data.item[0] });
//     } else if (data.item.length >= 2) {
//       data.item.forEach(data => {
//         addChapterChild({ deck: data });
//       });
//     }
//   });
// };
