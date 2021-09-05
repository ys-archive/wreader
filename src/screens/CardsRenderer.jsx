import React from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import { actData } from '../store/actions';

import CategoryCard from '../components/reader-card/category/CategoryCard';
import ChapterCard from '../components/reader-card/chapter/chapter-card/ChapterCard';

import { useCardsFetch } from '../hooks/useCardsFetch';

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);

  const categoryIdx = useStoreState(selSwiper.categoryIdx);
  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);

  return {
    categories,
    chapters,
    isLoaded,
    categoryIdx,
    depth,
    coords,
  };
};

const CardsRenderer = () => {
  useCardsFetch();

  const { categories, chapters, isLoaded, categoryIdx, depth, coords } =
    initStates();

  if (!isLoaded) return null;

  let CardJSX = null;
  const { x, y, z } = coords;

  if (depth === 0) {
    CardJSX = <CategoryCard data={categories[categoryIdx]} />;
  }

  if (depth === 1) {
    CardJSX = (
      <ChapterCard
        data={chapters[categoryIdx][x].deck}
        categoryTitle={categories[categoryIdx].title}
      />
    );
  }

  if (depth === 2) {
    CardJSX = (
      <ChapterCard
        data={chapters[categoryIdx][x].child[y].deck}
        categoryTitle={categories[categoryIdx].title}
      />
    );
  }

  if (depth === 3) {
    CardJSX = (
      <ChapterCard
        data={chapters[categoryIdx][x].child[y].child[z].deck}
        categoryTitle={categories[categoryIdx].title}
      />
    );
  }

  return CardJSX;
};

export default CardsRenderer;
