import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../../components/RN-components/Text";

import { useGetSWR } from "../../hooks";
import { useStoreActions, useStoreState } from "easy-peasy";
import { selAuth, selData, selSwiper } from "../../store/selectors";

// import ChapterService from "../../services/ChapterService";

import CategoryCard from "./category/CategoryCard";
import ChapterCard from "./chapter-card/ChapterCard";

// import FetchBeforeRender from "./CardsRenderer.fetch";
import CardIndicator from "./CardIndicator";

import LoadingModal from "../../components/modals/LoadingModal";
import { actData } from "../../store/actions";

const initStates = () => {
  // selectors
  const currentCategory = useStoreState(selData.currentCategory);
  const chapters = useStoreState(selData.chapters);
  const currentCategoryTitle = useStoreState(selData.currentCategoryTitle);
  const isLoaded = useStoreState(selData.isLoaded);

  const depth = useStoreState(selSwiper.depth);
  const curPos = useStoreState(selSwiper.curPos);

  // actions
  const loadRootAsync = useStoreActions(actData.loadCategoriesAsync);
  const setFetchId = useStoreActions(actData.setFetchId);
  const loadChapterAsync = useStoreActions(actData.loadChaptersAsync);

  return {
    currentCategory,
    chapters,
    currentCategoryTitle,
    isLoaded,

    depth,
    curPos,

    loadRootAsync,
    setFetchId,
    loadChapterAsync,
  };
};

const CardsRenderer = () => {
  const {
    currentCategory,
    chapters,
    currentCategoryTitle,
    isLoaded,
    depth,
    curPos,
    loadRootAsync,
    setFetchId,
    loadChapterAsync,
  } = initStates();

  useEffect(() => {
    loadRootAsync();
  }, []);

  useEffect(() => {
    if (depth === 0) {
      return;
    }

    setFetchId(0);
    loadChapterAsync();
  }, [depth]);

  let CardJSX = null;
  // console.log(chapters);

  // console.log(currentCategory && currentCategory.id);
  const currentChapters =
    depth !== 0 &&
    chapters &&
    currentCategory &&
    chapters.filter(ch => +ch.categoryId === +currentCategory.id);
  // console.log(currentChapters);

  if (depth === 0) {
    if (!isLoaded) {
      return <LoadingModal />;
    }

    CardJSX = <CategoryCard data={currentCategory} />;
  } else {
    if (isChaterLoading) {
      return <LoadingModal />;
    }

    CardJSX = (
      <ChapterCard
        data={currentChapters[curPos]}
        categoryTitle={currentCategoryTitle}
      />
    );
  }

  // return <CardIndicator>{CardJSX}</CardIndicator>;
  return <View>{isLoaded && CardJSX}</View>;
};

export default CardsRenderer;
