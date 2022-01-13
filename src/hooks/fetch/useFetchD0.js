import React from "react";
import { delay } from "../../utils";
import ChapterService from "../../services/ChapterService";
import { initStates } from "./useFetch.state";

let categories = undefined;

export const useFetchD0 = () => {
  const {
    userId,
    hasNew,
    setMaxCoords,
    resetCategory,
    addCategory,
    startLoading,
    updateHasNew,
    finishLoading,
  } = initStates();

  React.useEffect(() => {
    (async function fetchCategories() {
      if (!hasNew.d0) return;

      await delay(1);

      console.log("[useFetchD0] fetching D0");
      startLoading();

      resetCategory();

      const { data } = await ChapterService.GET_getCategory(userId);

      if (!data || !data.item || data.item.length === 0) return;

      // 카테고리 데이터 정제 및 저장
      categories = Object.values(data.item);

      // 카테고리 값 업데이트 - d0
      categories.forEach(category => addCategory(category));

      updateHasNew({ d0: false });
      finishLoading();
      setMaxCoords({
        category: categories.length,
        chapter: categories[0].maxLength,
      });
      updateHasNew({ d1: true });
    })();
  }, [userId, hasNew.d0]);
};
