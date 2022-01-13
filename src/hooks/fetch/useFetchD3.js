import React from "react";
import ChapterService from "../../services/ChapterService";
import { initStates } from "./useFetch.state";

export const useFetchD3 = () => {
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
  } = initStates();

  React.useEffect(() => {
    (async function fetchNext() {
      if (!isLoaded) {
        return;
      }

      if (!hasNew.d3) {
        return;
      }

      if (!chapters || chapters.length === 0) {
        return;
      }

      console.log("[useFetchD3] fetching D3");
      startLoading();

      const target = chapters[coords.d0][coords.d1].child[coords.d2];

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
      finishLoading();
    })();
  }, [isLoaded, hasNew.d3]);
};
