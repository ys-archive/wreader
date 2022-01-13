import React from "react";
import { asyncForEach, delay } from "../../utils";
import { initStates } from "./useFetch.state";

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
      if (!isLoaded) return;
      if (!hasNew.d1) return;
      if (!categories || categories.length === 0) return;

      console.log("[useFetchD1] fetching D1");
      resetChapters();
      // await delay(0.5);

      startLoading();

      // resetChapter();

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

      updateHasNew({ d1: false });
      finishLoading();
      // updateHasNew({ d2: true });
    })();
  }, [hasNew.d1, isLoaded]);
};
