import React, { useEffect } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";
import { selData, selSwiper } from "../../store/selectors";

import CategoryCard from "./category/CategoryCard";
import ChapterCard from "./chapter-card/ChapterCard";

import FetchBeforeRender from "./CardsRenderer.fetch";
import CardIndicator from "./CardIndicator";

import LoadingModal from "../../components/modals/LoadingModal";
import { actData } from "../../store/actions";

const initStates = () => {
  const loadRootAsync = useStoreActions(actData.loadRootAsync);

  return {
    loadRootAsync,
  };
};

const CardsRenderer = () => {
  const { loadRootAsync } = initStates();

  useEffect(() => {
    loadRootAsync();
  }, []);

  // if (!isLoaded.d0) return <LoadingModal />;
  // if (!isLoaded.d1) return <LoadingModal />;
  // if (!isLoaded.d2) return <LoadingModal />;
  // if (!isLoaded.d3) return <LoadingModal />;

  // if (!chapters || chapters.length === 0) return <LoadingModal />;

  // const { d0: md0, d1: md1, d2: md2, d3: md3 } = maxCoords;
  // console.log(
  //   `max coords---> md0:${md0} | md1:${md1} | md2:${md2} | md3:${md3}`,
  // );

  // const { d0, d1, d2, d3 } = coords;

  // // console.log(`    coords---> d0:${d0} | d1:${d1} | d2:${d2} | d3:${d3}`);
  // const currentCategoryTitle = categories[d0].title;
  // let CardJSX = null;

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
  //       if (!chapters[d0][d1] || chapters[d0][d1].child.length === 0) {
  //         return null;
  //       }
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
  //       if (
  //         !chapters[d0][d1] ||
  //         chapters[d0][d1].child.length === 0 ||
  //         chapters[d0][d1].child[d2].child.length === 0
  //       ) {
  //         return null;
  //       }
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
  // }

  // return <CardIndicator>{CardJSX}</CardIndicator>;
  return null;
};

export default CardsRenderer;
