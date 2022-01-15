import React from "react";
import ChapterService from "../../services/ChapterService";
import { initStates } from "./useFetch.state";

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
  } = initStates();

  React.useEffect(() => {
    (async function fetchUserChapters() {
      if (!isLoaded) {
        return;
      }

      if (!hasNew.d2) {
        return;
      }

      updateHasNew({ d2: false });
      if (!chapters || chapters.length === 0) {
        return;
      }

      // await delay(1);

      console.log("[useUserChapterFetch] fetching D2");

      startLoading();
      if (!chapters[coords.d0]) {
        return;
      }

      const target = chapters[coords.d0][coords.d1].deck;

      const { data } = await ChapterService.GET_getChapter(+target.id, userId);

      if (data.item.length === 1) {
        addChapterChild({ deck: data.item[0] });
      } else if (data.item.length >= 2) {
        data.item.forEach(data => addChapterChild({ deck: data }));
      }

      // 로딩 끝
      finishLoading();
    })();
  }, [hasNew.d2, isLoaded, userId]);
};
