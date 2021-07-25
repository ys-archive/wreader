import React from 'react';
import { createStore, StoreProvider, persist } from 'easy-peasy';
import logger from 'redux-logger';

import auth from './reducers/auth/auth';
import reader from './reducers/reader/reader';
import persistence from './reducers/persistence/persistence';
// import preference from './reducers/preference/preference';

const store = createStore({
  auth,
  reader,
  persistence: persist(persistence),
  // preference,
}); // , { middleware: logger }

// eslint-disable-next-line react/prop-types
export const ReduxProvider = ({ children }) => (
  <StoreProvider store={store}>{children}</StoreProvider>
);
