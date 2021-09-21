import React, { useCallback, useMemo } from 'react';

import { useStoreState } from 'easy-peasy';
import { selSwiper, selData } from '../../store/selectors';
import { DEPTH_NAME } from '../../store/reducers/swiper.depth';

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
  const hasNew = useStoreState(selData.hasNew);

  return {
    coords,
    maxCoords,
    depth,
    isSwiping,
    isLoaded,
    hasNew,
  };
};

const CardIndicator = ({ children }) => {
  const { coords, maxCoords, depth, isSwiping, isLoaded, hasNew } =
    initStates();

  // if (!isLoaded.d0) return null;

  let IndicatorJSX = null;

  switch (depth) {
    case DEPTH_NAME.CATEGORY:
      IndicatorJSX = isLoaded.d1 && renderWithDepth0(coords, maxCoords);
      break;

    case DEPTH_NAME.CHAPTER:
      IndicatorJSX = isLoaded.d2 && renderWithDepth1(coords, maxCoords);
      break;

    case DEPTH_NAME.USER_CHAPTER:
      IndicatorJSX = isLoaded.d3 && renderWithDepth2(coords, maxCoords);
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
