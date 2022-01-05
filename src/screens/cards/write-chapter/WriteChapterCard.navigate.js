import * as ScreenNames from "../../../navigators/ScreenNames";

export const navigateToWriteNewCategoryCard = (nav, param) => {
  const { category, depth } = param;
  nav.navigate(ScreenNames.MainWriteCard, {
    categoryTitle: category.title,
    categoryId: category.id,
    chapterId: 0,
    order: 0,
    depth,
  });
};

export const navigateToWriteNewEvenChapterCard = (nav, param) => {};

export const navigateToWriteNewOddChapterCard = (nav, param) => {};
