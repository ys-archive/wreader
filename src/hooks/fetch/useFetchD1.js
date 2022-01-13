import React from "react";
import { asyncForEach, delay } from "../../utils";
import { initStates } from "./useFetch.state";

export const useFetchD1 = () => {
  const {
    categories,
    isLoaded,
    hasNew,
    // resetChapters,
    addChapter,
    startLoading,
    finishLoading,
    updateHasNew,
  } = initStates();

  React.useEffect(() => {
    (async function fetchChapters() {
      if (!hasNew.d1) {
        return;
      }

      // 카테고리가 먼저 로드 되었어야 함
      if (!categories || categories.length === 0) {
        return;
      }

      console.log("[useFetchD1] fetching D1");
      // resetChapters();
      await delay(0.5);

      startLoading();
      // 챕터 데이터 정제 및 저장
      const chapters = Object.values(categories)
        .map(i => i.chapter)
        .filter(i => i.length > 0);
      // console.log('refined chapters --> ', chapters);

      if (!chapters || chapters.length === 0) {
        return;
      }

      // group_index 0 부터 저장
      await asyncForEach(chapters, async deck => {
        if (deck.length === 0) {
          return;
        }

        addChapter({ deck });
      });

      updateHasNew({ d1: false });
      finishLoading();
      // updateHasNew({ d2: true });
    })();
  }, [hasNew.d1]);
};
