// auth
// const getAuth = actions => actions.model;
export const actionsSetIsAutoLogin = actions => actions.auth.setIsAutoLogin;
export const actionsToggleIsAutoLogin = actions =>
  actions.auth.toggleIsAutoLogin;
export const actionsLogin = actions => actions.auth.login;
