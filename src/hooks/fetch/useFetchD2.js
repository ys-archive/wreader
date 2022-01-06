import React from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import { selData, selAuth, selSwiper } from "../../store/selectors";
import { actData, actSwiper } from "../../store/actions";

import ChapterService from "../../services/ChapterService";

const initStates = () => {
  // selectors
  const userId = useStoreState(selAuth.userId);

  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);
  const hasNew = useStoreState(selData.hasNew);

  const coords = useStoreState(selSwiper.coords);

  // actions
  // - data
  const addChapterChild = useStoreActions(actData.addChapterChild);
  const startLoading = useStoreActions(actData.startLoading);
  const finishLoading = useStoreActions(actData.finishLoading);
  const updateHasNew = useStoreActions(actData.updateHasNew);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    userId,

    chapters,
    isLoaded,
    hasNew,

    coords,

    addChapterChild,

    startLoading,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  };
};

export const useFetchD2 = () => {
  const {
    userId,

    chapters,
    isLoaded,
    hasNew,

    coords,

    addChapterChild,

    startLoading,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  } = initStates();

  React.useEffect(() => {
    (async function fetchUserChapters() {
      if (!isLoaded) return;
      if (!hasNew.d2) return;
      if (!chapters || chapters.length === 0) return;

      // await delay(1);

      console.log("[useUserChapterFetch] fetching D2");

      startLoading();

      // console.log(coords);

      // if (coords.d0 >= 2) return;

      // if (chapters[coords.d0][coords.d1]) return;
      if (!chapters[coords.d0]) return;

      const target = chapters[coords.d0][coords.d1].deck;

      const { data } = await ChapterService.GET_getChapter(+target.id, userId);

      if (data.item.length === 1) {
        addChapterChild({ deck: data.item[0] });
      } else if (data.item.length >= 2) {
        data.item.forEach(data => {
          addChapterChild({ deck: data });
        });
      }

      // 로딩 끝
      updateHasNew({ d2: false });
      finishLoading();
    })();
  }, [hasNew.d2, isLoaded, userId]);
};
