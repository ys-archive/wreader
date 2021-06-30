// auth
// const getAuth = actions => actions.model;
export const actionsSetAutoLogin = actions => actions.auth.setAutoLogin;
export const actionsToggleAutoLogin = actions => actions.auth.toggleAutoLogin;

// export const actionsLogin = actions => actions.auth.login;
export const actionsSetLoggedIn = actions => actions.auth.setLoggedIn;
export const actionsSetLoggedOut = actions => actions.auth.setLoggedOut;
