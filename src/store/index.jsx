import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
// import logger from 'redux-logger';

import auth from './reducers/auth';
import swiper from './reducers/swiper';
import image from './reducers/image';
import data from './reducers/data';

const store = createStore(
  {
    auth,
    data,
    swiper,
    image,
  },
  // { middleware: logger },
);

// eslint-disable-next-line react/prop-types
export const ReduxProvider = ({ children }) => (
  <StoreProvider store={store}>{children}</StoreProvider>
);
