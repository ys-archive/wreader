// auth
export const actionsSetAutoLogin = actions => actions.auth.setAutoLogin;
export const actionsToggleAutoLogin = actions => actions.auth.toggleAutoLogin;

export const actionsSetLoggedIn = actions => actions.auth.setLoggedIn;
export const actionsSetLoggedOut = actions => actions.auth.setLoggedOut;

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
