import React from 'react';

import { useStoreState } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';

import CategoryCard from '../components/reader-card/category/CategoryCard';
import ChapterCard from '../components/reader-card/chapter/chapter-card/ChapterCard';

import { useCardsFetch } from '../hooks/useCardsFetch';
import CardIndicator from './CardIndicator';

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
  useCardsFetch();

  const { categories, chapters, isLoaded, depth, coords, maxCoords } =
    initStates();

  if (!isLoaded) return null;

  const { d0: md0, d1: md1, d2: md2, d3: md3 } = maxCoords;
  console.log(
    `max coords---> md0:${md0} | md1:${md1} | md2:${md2} | md3:${md3}`,
  );
  const { d0, d1, d2, d3 } = coords;
  console.log(`    coords---> d0:${d0} | d1:${d1} | d2:${d2} | d3:${d3}`);

  let CardJSX = undefined;
  const curCategory = categories[d0];
  const curChapter = chapters[d0];

  if (depth === 0) {
    CardJSX = <CategoryCard data={curCategory} />;
  } else if (depth === 1) {
    CardJSX = (
      <ChapterCard
        data={curChapter[d1].deck}
        categoryTitle={curCategory.title}
      />
    );
  } else if (depth === 2) {
    CardJSX = (
      <ChapterCard
        data={curChapter[d1].child[d2].deck}
        categoryTitle={curCategory.title}
      />
    );
  } else if (depth === 3) {
    CardJSX = (
      <ChapterCard
        data={curChapter[d1].child[d2].child[d3].deck}
        categoryTitle={curCategory.title}
      />
    );
  }

  return <CardIndicator>{CardJSX}</CardIndicator>;
};

export default CardsRenderer;
