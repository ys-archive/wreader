import React, { useEffect } from "react";

import { useStoreState } from "easy-peasy";
import { selSwiper, selData } from "../../store/selectors";
import {
  renderWithDepth0,
  renderWithDepth1,
  renderWithDepth2,
  renderWithDepth3,
  renderWithDepth4,
  renderWithDepth5,
  renderWithDepth6,
  renderWithDepth7,
  renderWithDepth8,
  renderWithDepth9,
} from "./CardIndicator.render";

const initStates = () => {
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);
  const depth = useStoreState(selSwiper.depth);
  const isSwiping = useStoreState(selSwiper.isSwiping);

  const chapters = useStoreState(selData.chapters);

  return {
    coords,
    maxCoords,
    depth,
    isSwiping,

    chapters,
  };
};

const CardIndicator = ({ children }) => {
  const { coords, maxCoords, depth, isSwiping, chapters } = initStates();

  let IndicatorJSX = null;

  switch (depth) {
    case 0:
      IndicatorJSX = renderWithDepth0(coords, maxCoords);
      break;

    case 1:
      IndicatorJSX = renderWithDepth1(coords, chapters);
      break;

    case 2:
      IndicatorJSX = renderWithDepth2(coords, chapters);
      break;

    case 3:
      IndicatorJSX = renderWithDepth3(coords, chapters);
      break;

    case 4:
      IndicatorJSX = renderWithDepth4(coords, chapters);
      break;

    case 5:
      IndicatorJSX = renderWithDepth5(coords, chapters);
      break;

    case 6:
      IndicatorJSX = renderWithDepth6(coords, chapters);
      break;

    case 7:
      IndicatorJSX = renderWithDepth7(coords, chapters);
      break;

    case 8:
      IndicatorJSX = renderWithDepth8(coords, chapters);
      break;

    case 9:
      IndicatorJSX = renderWithDepth9(coords, chapters);
      break;
  }

  return (
    <>
      {/* {!isSwiping && IndicatorJSX} */}
      {IndicatorJSX}
      {children}
    </>
  );
};

export default CardIndicator;
