// auth
export const actionsLogin = actions => actions.auth.login;
export const actionsLogout = actions => actions.auth.logout;

export const actionsSetUserId = actions => actions.auth.userId;

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
export const actionsSetAutoLogin = actions => actions.persistence.setAutoLogin;
export const actionsToggleAutoLogin = actions =>
  actions.persistence.toggleAutoLogin;
