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

export const useFetchD9 = () => {
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
      if (!isLoaded.d8) return;
      if (!hasNew.d9) return;
      if (!chapters || chapters.length === 0) return;

      console.log("[useFetchD3] fetching d9");
      startLoading("d9");

      const target =
        chapters[coords.d0][coords.d1].child[coords.d2].child[coords.d3].child[
          coords.d4
        ].child[coords.d5].child[coords.d6].child[coords.d7].child[coords.d8];

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
      updateHasNew({ d9: false });
      finishLoading("d9");
    })();
  }, [isLoaded.d8, hasNew.d9]);

  React.useEffect(() => {
    if (!isLoaded.d9) return;

    // console.log(chapters);
    setMaxCoords({ d9: 100 });
  }, [isLoaded.d9]);
};
