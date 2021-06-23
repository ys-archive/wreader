import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import logger from 'redux-logger';

const store = createStore({}, { middleware: logger });

export const ReduxProvider = ({ children }) => (
  <StoreProvider store={store}>{children}</StoreProvider>
);
