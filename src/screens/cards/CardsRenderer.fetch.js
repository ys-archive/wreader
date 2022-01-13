import { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { actData } from "../../store/actions";
import ChapterService from "../../services/ChapterService";
import { initStates } from "../../hooks/fetch/useFetch.state";
import { asyncForEach } from "../../utils";

import {
  // useFetchD0,
  useFetchD1,
  useFetchD2,
  useFetchD3,
  useFetchD4,
  useFetchD5,
  useFetchD6,
  useFetchD7,
  useFetchD8,
  useFetchD9,
} from "../../hooks";

const useFetchBeforeRender = () => {
  const {
    userId,
    addChapter,
    addCategory,
    startLoading,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  } = initStates();

  useEffect(() => {
    console.log("start fetching!");
    fetch0();

    async function fetch0() {
      console.log("[useFetchD0] fetching D0");
      updateHasNew({ d0: true });
      startLoading();

      // resetCategory();

      const { data } = await ChapterService.GET_getCategory(userId);

      if (!data.item || data.item.length === 0) {
        return;
      }

      // 카테고리 데이터 정제 및 저장
      categories = Object.values(data.item);

      // 카테고리 값 업데이트 - d0
      categories.forEach(category => addCategory(category));

      finishLoading();
      setMaxCoords({
        category: categories.length,
        chapter: categories[0].maxLength,
      });
      updateHasNew({ d0: false });

      await fetch1();
    }

    async function fetch1() {
      // 카테고리가 먼저 로드 되었어야 함
      if (!categories || categories.length === 0) {
        return;
      }

      updateHasNew({ d1: true });

      console.log("[useFetchD1] fetching D1");
      // resetChapters();
      // await delay(0.5);

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

      finishLoading();

      updateHasNew({ d1: false });
    }
  }, []);

  // const f0 = useFetchD0();
  useFetchD1();
  useFetchD2();
  useFetchD3();
  useFetchD4();
  useFetchD5();
  useFetchD6();
  useFetchD7();
  useFetchD8();
  useFetchD9();
};

export default useFetchBeforeRender;
