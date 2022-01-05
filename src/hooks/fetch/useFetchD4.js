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

export const useFetchD4 = () => {
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
    (async function fetchNext() {
      if (!isLoaded.d3) return;
      if (!hasNew.d4) return;
      if (!chapters || chapters.length === 0) return;

      console.log("[useFetchD3] fetching D4");
      startLoading("d4");

      const target =
        chapters[coords.d0][coords.d1].child[coords.d2].child[coords.d3];

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
      updateHasNew({ d4: false });
      finishLoading("d4");
    })();
  }, [isLoaded.d3, hasNew.d4]);

  React.useEffect(() => {
    if (!isLoaded.d4) return;

    // console.log(chapters);
    setMaxCoords({ d4: 100 });
  }, [isLoaded.d4]);
};