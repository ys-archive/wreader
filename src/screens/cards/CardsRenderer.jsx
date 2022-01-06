import React from "react";

import { useStoreState } from "easy-peasy";
import { selData, selSwiper } from "../../store/selectors";

import CategoryCard from "./category/CategoryCard";
import ChapterCard from "./chapter-card/ChapterCard";

import FetchBeforeRender from "./CardsRenderer.fetch";
import CardIndicator from "./CardIndicator";

import LoadingModal from "../../components/modals/LoadingModal";

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

  if (!isLoaded) {
    return <LoadingModal />;
  }
  if (!chapters || chapters.length === 0) {
    return <LoadingModal />;
  }

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

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
        // if (!chapters[d0][d1] || chapters[d0][d1].child.length === 0) {
        //   return null;
        // }
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
        // if (
        //   !chapters[d0][d1] ||
        //   chapters[d0][d1].child.length === 0 ||
        //   chapters[d0][d1].child[d2].child.length === 0
        // ) {
        //   return null;
        // }
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

    case 4:
      {
        const chDat = chapters[d0][d1].child[d2].child[d3].child[d4].deck;
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d2 + 2}
          />
        );
      }
      break;

    case 5:
      {
        const chDat =
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].deck;
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d2 + 2}
          />
        );
      }
      break;

    case 6:
      {
        const chDat =
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
            .deck;
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d2 + 2}
          />
        );
      }
      break;

    case 7:
      {
        const chDat =
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
            .child[d7].deck;
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d2 + 2}
          />
        );
      }
      break;

    case 8:
      {
        const chDat =
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
            .child[d7].child[d8].deck;
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d2 + 2}
          />
        );
      }
      break;

    case 9:
      {
        const chDat =
          chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
            .child[d7].child[d8].child[d9].deck;
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
