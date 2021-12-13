import React, { useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import { selAuth, selData, selSwiper } from "../../store/selectors";
import { actDataFetch } from "../../store/actions";

import CategoryCard from "./category/CategoryCard";
import ChapterCard from "./chapter-card/ChapterCard";

// import FetchBeforeRender from "./CardsRenderer.fetch";
import CardIndicator from "./CardIndicator";

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const depth = useStoreState(selData.depth);

  const userId = useStoreState(selAuth.userId);

  // const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);

  const fetchCategories = useStoreActions(actDataFetch.fetchCategories);

  return {
    categories,
    chapters,
    userId,
    depth,
    coords,
    fetchCategories,
  };
};

const CardsRenderer = () => {
  const { categories, chapters, userId, depth, coords, fetchCategories } =
    initStates();

  useEffect(() => {
    fetchCategories(userId);
  }, [userId]);

  // if (!isLoaded.d0) return null;
  // if (!isLoaded.d1) return null;

  if (!chapters || chapters.length === 0) return null;

  let CardJSX = null;

  // if (depth ===0) {
  //   CardJSX = <CategoryCard data={} />
  // } else {
  //   CardJSX = <ChapterCard />
  // }

  // switch (depth) {
  //   case 0:
  //     CardJSX = <CategoryCard data={categories[d0]} />;
  //     break;

  //   case 1:
  //     {
  //       // if (chapters[d0][d1].child.length === 0) return null;
  //       // const chDat =
  //       //   d1 === 0
  //       //     ? chapters[d0][d1].child[0].deck
  //       //     : chapters[d0][0].child[0].child.length > 0
  //       //     ? chapters[d0][0].child[0].child[d1 - 1].deck
  //       //     : null;
  //       const chDat = chapters[d0][d1].deck;
  //       // console.log(chapters[d0][0].child[0].child[d1 + 1]);
  //       CardJSX = (
  //         <ChapterCard
  //           data={chDat}
  //           categoryTitle={currentCategoryTitle}
  //           order={d1}
  //         />
  //       );
  //     }
  //     break;

  //   case 2:
  //     {
  //       // if (chapters[d0][d1].child.length === 0) return null;
  //       const chDat = chapters[d0][d1].child[d2].deck;
  //       CardJSX = (
  //         <ChapterCard
  //           data={chDat}
  //           categoryTitle={currentCategoryTitle}
  //           order={d1}
  //         />
  //       );
  //     }
  //     break;

  //   case 3:
  //     {
  //       const chDat = chapters[d0][d1].child[d2].child[d3].deck;
  //       CardJSX = (
  //         <ChapterCard
  //           data={chDat}
  //           categoryTitle={currentCategoryTitle}
  //           order={d3 + 1 + d1}
  //         />
  //       );
  //     }
  //     break;
  // }

  return <CardIndicator>{CardJSX}</CardIndicator>;
};

export default CardsRenderer;
