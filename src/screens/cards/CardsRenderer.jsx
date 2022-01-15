import React from "react";

import { useStoreState } from "easy-peasy";
import { selData, selSwiper } from "../../store/selectors";

import CategoryCard from "./category/CategoryCard";
import ChapterCard from "./chapter-card/ChapterCard";

import CardIndicator from "./CardIndicator";

import LoadingModal from "../../components/modals/LoadingModal";

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);
  const hasNew = useStoreState(selData.hasNew);

  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);

  return {
    categories,
    chapters,
    isLoaded,
    hasNew,

    depth,
    coords,
  };
};

const CardsRenderer = () => {
  const { categories, chapters, isLoaded, depth, coords } = initStates();

  if (!isLoaded) {
    return <LoadingModal />;
  }

  if ((depth === 0) & (!categories | !categories.length)) {
    return <LoadingModal />;
  }

  if ((depth !== 0) & (!chapters | !chapters.length)) {
    return <LoadingModal />;
  }

  let curData = null;
  let order = 1;
  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  switch (depth) {
    case 0:
      curData = categories[d0];
      break;

    case 1:
      curData = chapters[d0][d1].deck;
      order = 1;
      break;

    case 2:
      curData = chapters[d0][d1].child[d2].deck;
      order = d2 + 2;
      break;

    case 3:
      curData = chapters[d0][d1].child[d2].child[d3].deck;
      order = d3 + (d2 + 2);
      break;

    case 4:
      curData = chapters[d0][d1].child[d2].child[d3].child[d4].deck;
      order = d4 + (d2 + d3 + 2);
      break;

    case 5:
      curData = chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].deck;
      order = d5 + (d2 + d3 + d4 + 2);
      break;

    case 6:
      curData =
        chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6].deck;
      order = d6 + 1;
      break;

    case 7:
      curData =
        chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
          .child[d7].deck;
      order = d7 + 1;
      break;

    case 8:
      curData =
        chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
          .child[d7].child[d8].deck;
      order = d8 + 1;
      break;

    case 9:
      curData =
        chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
          .child[d7].child[d8].child[d9].deck;
      order = d9 + 1;
      break;
  }

  // console.log(curData);

  if (!curData) {
    return <LoadingModal />;
  }

  let CardJSX = null;

  if (depth === 0) {
    CardJSX = <CategoryCard data={curData} />;
  } else {
    CardJSX = (
      <ChapterCard
        data={curData}
        categoryTitle={categories[d0].title}
        // order={depth !== 1 ? d2 + 2 : null}
        order={order}
      />
    );
  }

  return <CardIndicator>{CardJSX}</CardIndicator>;
};

export default CardsRenderer;

// switch (depth) {
//   case 0:
//     CardJSX = <CategoryCard data={categories[d0]} />;
//     break;

//   case 1:
//     {
//       const chDat = chapters[d0][d1].deck;
//       CardJSX = (
//         <ChapterCard data={chDat} categoryTitle={currentCategoryTitle} />
//       );
//     }
//     break;

//   case 2:
//     {
//       // if (!chapters[d0][d1] || chapters[d0][d1].child.length === 0) {
//       //   return null;
//       // }
//       const chDat = chapters[d0][d1].child[d2].deck;
//       CardJSX = (
//         <ChapterCard
//           data={chDat}
//           categoryTitle={currentCategoryTitle}
//           order={d2 + 2}
//         />
//       );
//     }
//     break;

//   case 3:
//     {
//       // if (
//       //   !chapters[d0][d1] ||
//       //   chapters[d0][d1].child.length === 0 ||
//       //   chapters[d0][d1].child[d2].child.length === 0
//       // ) {
//       //   return null;
//       // }
//       const chDat = chapters[d0][d1].child[d2].child[d3].deck;
//       CardJSX = (
//         <ChapterCard
//           data={chDat}
//           categoryTitle={currentCategoryTitle}
//           order={d2 + 2}
//         />
//       );
//     }
//     break;

//   case 4:
//     {
//       const chDat = chapters[d0][d1].child[d2].child[d3].child[d4].deck;
//       CardJSX = (
//         <ChapterCard
//           data={chDat}
//           categoryTitle={currentCategoryTitle}
//           order={d2 + 2}
//         />
//       );
//     }
//     break;

//   case 5:
//     {
//       const chDat =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].deck;
//       CardJSX = (
//         <ChapterCard
//           data={chDat}
//           categoryTitle={currentCategoryTitle}
//           order={d2 + 2}
//         />
//       );
//     }
//     break;

//   case 6:
//     {
//       const chDat =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .deck;
//       CardJSX = (
//         <ChapterCard
//           data={chDat}
//           categoryTitle={currentCategoryTitle}
//           order={d2 + 2}
//         />
//       );
//     }
//     break;

//   case 7:
//     {
//       const chDat =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .child[d7].deck;
//       CardJSX = (
//         <ChapterCard
//           data={chDat}
//           categoryTitle={currentCategoryTitle}
//           order={d2 + 2}
//         />
//       );
//     }
//     break;

//   case 8:
//     {
//       const chDat =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .child[d7].child[d8].deck;
//       CardJSX = (
//         <ChapterCard
//           data={chDat}
//           categoryTitle={currentCategoryTitle}
//           order={d2 + 2}
//         />
//       );
//     }
//     break;

//   case 9:
//     {
//       const chDat =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .child[d7].child[d8].child[d9].deck;
//       CardJSX = (
//         <ChapterCard
//           data={chDat}
//           categoryTitle={currentCategoryTitle}
//           order={d2 + 2}
//         />
//       );
//     }
//     break;
// }
