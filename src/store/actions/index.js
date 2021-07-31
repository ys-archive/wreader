// auth
export const actionsLogin = actions => actions.auth.login;
export const actionsLogout = actions => actions.auth.logout;

export const actionsSetUserId = actions => actions.auth.setUserId;
export const actionsSetEmail = actions => actions.auth.setEmail;
export const actionsSetUserInfo = actions => actions.auth.setUserInfo;

// reader
export const actionsSetIsMovingChapterLock = actions =>
  actions.reader.setIsMovingChapterLock;

export const actionsSetCategorySelected = actions =>
  actions.reader.setCategorySelected;
export const actionsSetLastCategoryIdx = actions =>
  actions.reader.setLastCategoryIdx;
export const actionsSetLastChapterIdx = actions =>
  actions.reader.setLastChapterIdx;

export const actionsMoveTo = actions => actions.reader.moveTo;
export const actionsMoveToCategory = actions => actions.reader.moveToCategory;
export const actionsMoveToChapter = actions => actions.reader.moveToChapter;

export const actionsReset = actions => actions.reader.reset;

export const actionsSwipeToLeft = actions => actions.reader.swipeToLeft;
export const actionsSwipeToRight = actions => actions.reader.swipeToRight;
export const actionsSwipeToUp = actions => actions.reader.swipeToUp;
export const actionsSwipeToDown = actions => actions.reader.swipeToDown;

// TODO: App preference 추가

// persistence
export const actionsEnableAutoLogin = actions =>
  actions.persistence.enableAutoLogin;
export const actionsDisableAutoLogin = actions =>
  actions.persistence.disableAutoLogin;
export const actionsToggleAutoLogin = actions =>
  actions.persistence.toggleAutoLogin;
export const actionsExecuteAppFirstTime = actions =>
  actions.persistence.executeAppFirstTime;
export const actionsIgnoreEventModalFor1day = actions =>
  actions.persistence.ignoreEventModalFor1day;
export const actionsIgnoreEventModalFor7days = actions =>
  actions.persistence.ignoreEventModalFor7days;

// preference

// image
export const actionsResetImage = actions => actions.image.reset;
export const actionsSetProfileLocalImagePath = actions =>
  actions.image.setProfileLocalImagePath;
export const actionsSetProfileImageUrl = actions =>
  actions.image.setProfileImageUrl;
