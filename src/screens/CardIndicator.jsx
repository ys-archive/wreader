import React from 'react';

import { useStoreState } from 'easy-peasy';
import { selSwiper, selData } from '../store/selectors';
import { DEPTH_NAME } from '../store/reducers/swiper.depth';

import {
  renderWithDepth0,
  renderWithDepth1,
  renderWithDepth2,
  renderWithDepth3,
} from './CardIndicator.render';

const initStates = () => {
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);
  const depth = useStoreState(selSwiper.depth);
  const isSwiping = useStoreState(selSwiper.isSwiping);
  const isLoaded = useStoreState(selData.isLoaded);

  return {
    coords,
    maxCoords,
    depth,
    isSwiping,
    isLoaded,
  };
};

const CardIndicator = ({ children }) => {
  const { coords, maxCoords, depth, isSwiping, isLoaded } = initStates();

  if (!isLoaded) return null;
  

  let IndicatorJSX = undefined;

  switch (depth) {
    case DEPTH_NAME.CATEGORY:
      IndicatorJSX = renderWithDepth0(coords, maxCoords);
      break;

    case DEPTH_NAME.CHAPTER:
      IndicatorJSX = renderWithDepth1(coords, maxCoords);
      break;

    case DEPTH_NAME.USER_CHAPTER:
      IndicatorJSX = renderWithDepth2(coords, maxCoords);
      break;

    case DEPTH_NAME.NEXT:
      IndicatorJSX = renderWithDepth3(coords, maxCoords);
      break;
  }

  return (
    <>
      {!isSwiping && IndicatorJSX}
      {children}
    </>
  );
};

export default CardIndicator;
