import React, { useEffect } from "react";

import { useStoreState } from "easy-peasy";
import { selSwiper, selData } from "../../store/selectors";
import {
  renderIndicatorCategory,
  renderIndicatorChapter,
} from "./CardIndicator.render";

const initStates = () => {
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);
  const depth = useStoreState(selSwiper.depth);
  const chapters = useStoreState(selData.chapters);

  return {
    coords,
    maxCoords,
    depth,
    chapters,
  };
};

const CardIndicator = ({ children }) => {
  const { coords, maxCoords, depth, chapters } = initStates();

  let IndicatorJSX = null;

  if (depth === 0) {
    IndicatorJSX = renderIndicatorCategory({
      coords,
      maxCoords,
    });
  } else {
    IndicatorJSX = renderIndicatorChapter({
      coords,
      chapters,
      depth,
    });
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
