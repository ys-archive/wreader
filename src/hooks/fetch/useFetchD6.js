import React from "react";
import ChapterService from "../../services/ChapterService";
import { initStates } from "./useFetch.state";

export const useFetchD6 = () => {
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

      if (!hasNew.d6) {
        return;
      }

      if (!chapters || chapters.length === 0) {
        return;
      }

      console.log("[useFetchD6] fetching d6");
      startLoading();

      const target =
        chapters[coords.d0][coords.d1].child[coords.d2].child[coords.d3].child[
          coords.d4
        ].child[coords.d5];

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
      updateHasNew({ d6: false });
      finishLoading();
    })();
  }, [isLoaded, hasNew.d6]);
};
