import ChapterService from "./ChapterService";
import { asyncForEach } from "../utils/async";

export const fetchCategory = async states => {
  // const {
  //   userId,
  //   resetCategory,
  //   addCategory,
  //   startLoading,
  //   finishLoading,
  //   setMaxCoords,
  // } = states;
  // let { categories } = states;
  // console.log("[useFetchD0] fetching D0");
  // resetCategory();
  // startLoading();
  // const { data } = await ChapterService.GET_getCategory(userId);
  // if (!data.item || data.item.length === 0) {
  //   return;
  // }
  // // 카테고리 데이터 정제 및 저장
  // categories = Object.values(data.item);
  // // 카테고리 값 업데이트 - d0
  // categories.forEach(category => addCategory(category));
  // finishLoading();
  // setMaxCoords({
  //   category: categories.length,
  //   chapter: categories[0].maxLength,
  // });
  // console.log("[useFetchD1] before fetching D1");
  // await fetchChapterD1(states);
};

export const fetchChapterD1 = async states => {
  // 카테고리가 먼저 로드 되었어야 함
  // if (!states.categories.length) {
  //   return;
  // }
  // const { categories, resetChapter, startLoading, finishLoading, addChapter } =
  //   states;
  // console.log("[useFetchD1] fetching D1");
  // resetChapter();
  // startLoading();
  // // 챕터 데이터 정제 및 저장
  // const chapters = Object.values(categories)
  //   .map(i => i.chapter)
  //   .filter(i => i.length > 0);
  // // console.log('refined chapters --> ', chapters);
  // if (!chapters || chapters.length === 0) {
  //   return;
  // }
  // // group_index 0 부터 저장
  // await asyncForEach(chapters, async deck => {
  //   if (deck.length === 0) {
  //     return;
  //   }
  //   addChapter({ deck });
  // });
  // finishLoading();
};

export const fetchChapterAfter = async states => {
  // const {
  //   chapters,
  //   coords: { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 },
  // } = states;
  // if (!chapters || chapters.length === 0) {
  //   return;
  // }
  // if (!chapters[d0]) {
  //   return;
  // }
  // const { startLoading, finishLoading, userId, addChapterChild, depth } =
  //   states;
  // console.log(`[useFetchD${depth}] fetching D${depth}`);
  // const target = getTarget(chapters[d0][d1], depth, coords);
  // startLoading();
  // const { data } = await ChapterService.GET_getChapter(+target.deck.id, userId);
  // if (data.item.length === 1) {
  //   addChapterChild({ deck: data.item[0] });
  // } else if (data.item.length >= 2) {
  //   data.item.forEach(data => addChapterChild({ deck: data }));
  // }
  // // 로딩 끝
  // finishLoading();
};

// const getTarget = (head, targetDepth, coords) => {
//   let res = head;
//   for (let i = 2; i < targetDepth; ++i) {
//     res = res.child[coords[`d${i}`]];
//   }
//   return res;
// };
