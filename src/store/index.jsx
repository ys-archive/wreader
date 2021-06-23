import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import logger from 'redux-logger';

import auth from './reducers/auth/auth';

const store = createStore({ auth }, { middleware: logger });

// eslint-disable-next-line react/prop-types
export const ReduxProvider = ({ children }) => (
  <StoreProvider store={store}>{children}</StoreProvider>
);
