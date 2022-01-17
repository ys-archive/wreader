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

  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);

  return {
    categories,
    chapters,
    isLoaded,

    depth,
    coords,
    maxCoords,
  };
};

const CardsRenderer = () => {
  const { categories, chapters, isLoaded, depth, coords, maxCoords } =
    initStates();

  if (!isLoaded) {
    return <LoadingModal />;
  }

  if (!categories | !categories.length) {
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
      order = d2 + 2;
      break;

    case 4:
      curData = chapters[d0][d1].child[d2].child[d3].child[d4].deck;
      order = d2 + 2 + d4 + 1;
      break;

    case 5:
      curData = chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].deck;
      order = d2 + 2 + d4 + 1;
      break;

    case 6:
      curData =
        chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6].deck;
      order = d2 + 2 + d4 + 1 + d6 + 1;
      break;

    case 7:
      curData =
        chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
          .child[d7].deck;
      order = d2 + 2 + d4 + 1 + d6 + 1;
      break;

    case 8:
      curData =
        chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
          .child[d7].child[d8].deck;
      order = d2 + 2 + d4 + 1 + d6 + 1 + d8 + 1;
      break;

    case 9:
      curData =
        chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
          .child[d7].child[d8].child[d9].deck;
      order = d2 + 2 + d4 + 1 + d6 + 1 + d8 + 1;
      break;
  }

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

  const cardIndicatorProps = {
    coords,
    maxCoords,
    depth,
    chapters,
  };

  return <CardIndicator {...cardIndicatorProps}>{CardJSX}</CardIndicator>;
};

export default CardsRenderer;
