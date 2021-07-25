// auth
export const selectIsLoggedIn = state => state.auth.model.isLoggedIn;
export const selectUserId = state => state.auth.model.userId;

// reader
export const selectIsFirstCategory = state => state.reader.isFirstCategory;
export const selectIsLastCategory = state => state.reader.isLastCategory;

export const selectIsFirstChapter = state => state.reader.isFirstChapter;
export const selectIsLastChapter = state => state.reader.isLastChapter;

export const selectIsCategorySelected = state =>
  state.reader.model.isCategorySelected;

export const selectSwipeThresholdHorizontal = state =>
  state.reader.model.swipeThresholdHorizontal;
export const selectSwipeThresholdVertical = state =>
  state.reader.model.swipeThresholdVertical;

// persistence
export const selectIsAutoLogin = state => state.persistence.model.isAutoLogin;
