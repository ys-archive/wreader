// auth
export const actionsLogin = actions => actions.auth.login;
export const actionsLogout = actions => actions.auth.logout;

export const actionsSetUserId = actions => actions.auth.setUserId;
export const actionsSetEmail = actions => actions.auth.setEmail;

// reader
export const actionsSetCategorySelected = actions =>
  actions.reader.setCategorySelected;
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
