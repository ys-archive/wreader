import React from "react";
import { createStore, StoreProvider } from "easy-peasy";
// import logger from 'redux-logger';

import auth from "./reducers/auth";
import swiper from "./reducers/swiper";
import image from "./reducers/image";
import data from "./reducers/data";
import dataFetch from "./reducers/data.fetch";
import sort from "./reducers/sort";

const store = createStore(
  {
    auth,
    data,
    dataFetch,
    swiper,
    image,
    sort,
  },
  // { middleware: logger },
);

// eslint-disable-next-line react/prop-types
export const ReduxProvider = ({ children }) => (
  <StoreProvider store={store}>{children}</StoreProvider>
);
