import React from 'react';
import { createStore, StoreProvider, persist } from 'easy-peasy';
import logger from 'redux-logger';
import storage from './config/persistStorageConfig';

import auth from './reducers/auth';
import reader from './reducers/reader';
import persistence from './reducers/persistence';
// import preference from './reducers/preference/preference';
import image from './reducers/image';

const store = createStore(
  {
    auth,
    reader,
    persistence: persist(persistence, { storage }),
    // preference,
    image,
  },
  // { middleware: logger },
);

// eslint-disable-next-line react/prop-types
export const ReduxProvider = ({ children }) => (
  <StoreProvider store={store}>{children}</StoreProvider>
);
