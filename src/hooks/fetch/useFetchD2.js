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
      // console.log("[useUserChapterFetch] fetching D2");
      console.log("1");
      if (!isLoaded) {
        return;
      }

      console.log("2");
      if (!hasNew.d2) {
        return;
      }

      console.log("3");
      if (!chapters || chapters.length === 0) {
        return;
      }

      // await delay(1);

      console.log("[useUserChapterFetch] fetching D2");

      startLoading();
      console.log("4");
      if (!chapters[coords.d0]) {
        return;
      }

      console.log("5");
      const target = chapters[coords.d0][coords.d1].deck;

      const { data } = await ChapterService.GET_getChapter(+target.id, userId);

      if (data.item.length === 1) {
        addChapterChild({ deck: data.item[0] });
      } else if (data.item.length >= 2) {
        data.item.forEach(data => addChapterChild({ deck: data }));
      }

      // 로딩 끝
      updateHasNew({ d2: false });
      finishLoading();
    })();
  }, [hasNew.d2, isLoaded, userId]);
};
