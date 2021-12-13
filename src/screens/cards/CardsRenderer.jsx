import React from "react";

import { useStoreState } from "easy-peasy";
import { selData, selSwiper } from "../../store/selectors";

import CategoryCard from "./category/CategoryCard";
import ChapterCard from "./chapter-card/ChapterCard";

import FetchBeforeRender from "./CardsRenderer.fetch";
import CardIndicator from "./CardIndicator";

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);

  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);

  return {
    categories,
    chapters,
    isLoaded,
    depth,
    coords,
  };
};

const CardsRenderer = () => {
  const { categories, chapters, isLoaded, depth, coords } = initStates();

  FetchBeforeRender();

  if (!isLoaded.d0) return null;
  if (!isLoaded.d1) return null;

  if (!chapters || chapters.length === 0) return null;

  // const { d0: md0, d1: md1, d2: md2, d3: md3 } = maxCoords;
  // console.log(
  //   `max coords---> md0:${md0} | md1:${md1} | md2:${md2} | md3:${md3}`,
  // );

  const { d0, d1, d2, d3 } = coords;

  // console.log(`    coords---> d0:${d0} | d1:${d1} | d2:${d2} | d3:${d3}`);
  const currentCategoryTitle = categories[d0].title;
  let CardJSX = null;

  switch (depth) {
    case 0:
      CardJSX = <CategoryCard data={categories[d0]} />;
      break;

    case 1:
      {
        const chDat = chapters[d0][d1].deck;
        CardJSX = (
          <ChapterCard data={chDat} categoryTitle={currentCategoryTitle} />
        );
      }
      break;

    case 2:
      {
        const chDat = chapters[d0][d1].child[d2].deck;
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d2 + 2}
          />
        );
      }
      break;

    case 3:
      {
        const chDat = chapters[d0][d1].child[d2].child[d3].deck;
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d2 + 2}
          />
        );
      }
      break;
  }

  return <CardIndicator>{CardJSX}</CardIndicator>;
};

export default CardsRenderer;
