import React from "react";
import { asyncForEach, delay } from "../../utils";

import { useStoreState, useStoreActions } from "easy-peasy";
import { selData } from "../../store/selectors";
import { actData } from "../../store/actions";

const initStates = () => {
  // selectors
  const categories = useStoreState(selData.categories);
  const isLoaded = useStoreState(selData.isLoaded);
  const hasNew = useStoreState(selData.hasNew);

  // actions
  // - data
  const resetChapters = useStoreActions(actData.resetChapter);
  const addChapter = useStoreActions(actData.addChapter);

  const startLoading = useStoreActions(actData.startLoading);
  const finishLoading = useStoreActions(actData.finishLoading);

  const updateHasNew = useStoreActions(actData.updateHasNew);

  return {
    categories,
    isLoaded,
    hasNew,

    resetChapters,
    addChapter,

    startLoading,
    finishLoading,

    updateHasNew,
  };
};

let chapters = undefined;

export const useFetchD1 = () => {
  const {
    categories,
    isLoaded,
    hasNew,
    resetChapters,
    addChapter,
    startLoading,
    finishLoading,
    updateHasNew,
  } = initStates();

  React.useEffect(() => {
    (async function fetchChapters() {
      // 카테고리가 먼저 로드 되었어야 함
      if (!isLoaded.d0) return;
      if (!hasNew.d1) return;
      if (!categories || categories.length === 0) return;

      console.log("[useFetchD1] fetching D1");
      resetChapters();
      await delay(0.5);

      startLoading("d1");

      // resetChapter();
      updateHasNew({ d1: false });

      // 챕터 데이터 정제 및 저장
      chapters = Object.values(categories)
        .map(i => i.chapter)
        .filter(i => i.length > 0);
      // console.log('refined chapters --> ', chapters);

      if (!chapters || chapters.length === 0) return;

      // group_index 0 부터 저장
      await asyncForEach(chapters, async deck => {
        if (deck.length === 0) return;

        addChapter({ deck });
      });

      finishLoading("d1");
      updateHasNew({ d2: true });
    })();
  }, [hasNew.d1, isLoaded.d0]);

  // React.useEffect(() => {
  //   if (!isLoaded.d1) return;

  //   updateHasNew({ d1: false });
  // }, [isLoaded.d1, chapters]);
};
