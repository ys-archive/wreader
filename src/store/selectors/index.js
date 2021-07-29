// auth
export const selectIsLoggedIn = state => state.auth.model.isLoggedIn;
export const selectUserId = state => state.auth.model.userId;
export const selectEmail = state => state.auth.model.email;
export const persistGetUserInfo = state => state.auth.getUserInfo;
export const persistGetUserName = state => state.auth.getUserName;

// reader
export const persistIsFirstCategory = state => state.reader.isFirstCategory;
export const persistIsLastCategory = state => state.reader.isLastCategory;

export const persistIsFirstChapter = state => state.reader.isFirstChapter;
export const persistIsLastChapter = state => state.reader.isLastChapter;

export const selectIsCategorySelected = state =>
  state.reader.model.isCategorySelected;

export const selectSwipeThresholdHorizontal = state =>
  state.reader.model.swipeThresholdHorizontal;
export const selectSwipeThresholdVertical = state =>
  state.reader.model.swipeThresholdVertical;

// persistence
export const selectIsAutoLogin = state => state.persistence.model.isAutoLogin;
export const persistIsDueDateOver = state => stat.persistence.isDueDateOver;
