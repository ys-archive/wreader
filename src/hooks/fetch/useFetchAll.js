// import React from 'react';
// import { asyncForEach } from '../../utils';

// import { useStoreState, useStoreActions } from 'easy-peasy';
// import { selData, selAuth, selSwiper } from '../../store/selectors';
// import { actData, actSwiper } from '../../store/actions';

// import ChapterService from '../../services/ChapterService';

// const initStates = () => {
//   // selectors
//   const userId = useStoreState(selAuth.userId);

//   const chapters = useStoreState(selData.chapters);
//   const maxCoords = useStoreState(selSwiper.maxCoords);
//   const isUpdatingAll = useStoreState(selData.isUpdatingAll);

//   // actions
//   // - data
//   const reset = useStoreActions(actData.reset);
//   const addCategory = useStoreActions(actData.addCategory);
//   const addChapter = useStoreActions(actData.addChapter);
//   const addChapterChild = useStoreActions(actData.addChapterChild);
//   const updateAll = useStoreActions(actData.updateAll);

//   // - swiper
//   const initCoords = useStoreActions(actSwiper.initCoords);
//   const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

//   return {
//     userId,
//     chapters,

//     maxCoords,
//     isUpdatingAll,

//     reset,
//     addCategory,
//     addChapter,
//     addChapterChild,
//     updateAll,

//     initCoords,
//     setMaxCoords,
//   };
// };

// export const useFetchAll = () => {
//   // state 가져오기
//   const states = initStates();

//   React.useEffect(() => {
//     async function fetch() {
//       if (!states.isUpdatingAll) return;

//       states.reset();

//       const { data } = await ChapterService.GET_getCategory();

//       if (!data.item.length) return;

//       // 카테고리 데이터 정제 및 저장
//       const categories = Object.values(
//         JSON.parse(JSON.stringify(data.item)),
//       ).map(item => {
//         delete item.chapter;
//         return item;
//       });

//       // 카테고리 값 업데이트
//       states.setMaxCoords({ d0: categories });
//       categories.forEach(category => states.addCategory(category));

//       // 챕터 데이터 정제 및 저장
//       const chapters = Object.values(data.item)
//         .map(i => i.chapter)
//         .filter(i => i.length > 0);

//       if (!chapters || chapters.length === 0) return;

//       // group_index 0 부터 저장
//       await asyncForEach(chapters, async deck => {
//         if (deck.length === 0) return;

//         states.addChapter({ deck });

//         // 이후의 chapterId 로 재귀적으로 fetch
//         await fetchRecursively(deck, states.userId, states.addChapterChild);
//       });

//       // states.setMaxCoords({ d1: states.chapters });
//       states.setMaxCoords({ d2: states.chapters });
//       states.setMaxCoords({ d3: states.chapters });
//       states.updateAll(false);
//     }

//     fetch();
//   }, [states.isUpdatingAll]);
// };

// const fetchRecursively = async (arr, userId, addChapterChild) => {
//   await asyncForEach(arr, async item => {
//     const { data } = await ChapterService.GET_getChapter(+item.id, +userId);

//     switch (data.item.length) {
//       case 0:
//         return;

//       case 1:
//         addChapterChild({ deck: data.item[0] });
//         break;

//       default:
//         // >= 2
//         data.item.forEach(data => {
//           addChapterChild({ deck: data });
//         });
//         break;
//     }

//     await fetchRecursively(data.item, userId, addChapterChild);
//   });
// };
