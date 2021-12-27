import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../../components/RN-components/Text";

import { useStoreActions, useStoreState } from "easy-peasy";
import { selAuth, selData, selSwiper } from "../../store/selectors";

import ChapterService from "../../services/ChapterService";

import CategoryCard from "./category/CategoryCard";
import ChapterCard from "./chapter-card/ChapterCard";

import FetchBeforeRender from "./CardsRenderer.fetch";
import CardIndicator from "./CardIndicator";

import LoadingModal from "../../components/modals/LoadingModal";
import { actData } from "../../store/actions";

const initStates = () => {
  // selectors
  const userId = useStoreState(selAuth.userId);

  const root = useStoreState(selData.root);
  const isLoaded = useStoreState(selData.isLoaded);

  const depth = useStoreState(selSwiper.depth);
  const curPos = useStoreState(selSwiper.curPos);

  // actions
  const loadRootAsync = useStoreActions(actData.loadRootAsync);

  return {
    userId,

    root,
    isLoaded,

    depth,
    curPos,

    loadRootAsync,
  };
};

const CardsRenderer = () => {
  const { userId, root, isLoaded, depth, curPos, loadRootAsync } = initStates();
  const [chapters, setChapters] = useState(null);

  useEffect(() => {
    loadRootAsync();
  }, []);

  const category = root[curPos];

  useEffect(() => {
    async function fetchChapter() {
      const { data } = await ChapterService.GET_getChapter(0, userId);

      const currentChapters = data.item.filter(
        item => +item.categoryId - 5 === curPos,
      );
      setChapters(currentChapters);
    }

    fetchChapter();
  }, [depth, userId]);

  if (!isLoaded) {
    return <LoadingModal />;
  }

  const categoryTitle = category.title;
  let CardJSX = null;

  if (depth === 0) {
    CardJSX = <CategoryCard data={category} />;
  } else {
    CardJSX = (
      <ChapterCard data={chapters[curPos]} categoryTitle={categoryTitle} />
    );
  }

  // return <CardIndicator>{CardJSX}</CardIndicator>;
  return <View>{isLoaded && CardJSX}</View>;
};

export default CardsRenderer;
