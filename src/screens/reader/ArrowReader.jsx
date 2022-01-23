import React, { useState, useEffect } from "react";
import { Animated } from "react-native";
import { useStoreState } from "easy-peasy";
import { selSwiper, selData } from "../../store/selectors";

import {
  useSwipeGesture,
  useSwipeRight,
  useSwipeLeft,
  useSwipeUp,
  useSwipeDown,
} from "../../hooks";

import { renderArrowCategory, renderArrowChapter } from "./ArrowReader.render";

const initStates = () => {
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);
  const depth = useStoreState(selSwiper.depth);

  return {
    coords,
    maxCoords,
    depth,
  };
};

const ArrowReader = ({ children }) => {
  const { swipe, getStyle } = useSwipeGesture();
  const [isArrowClicked, clickArrow] = useState(false);

  const { coords, maxCoords, depth } = initStates();

  const swipeLeft = useSwipeLeft(swipe);
  const swipeRight = useSwipeRight(swipe);
  const swipeUp = useSwipeUp(swipe);
  const swipeDown = useSwipeDown(swipe);

  useEffect(() => {
    let timer = null;
    if (clickArrow) {
      timer = setTimeout(() => {
        clickArrow(false);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isArrowClicked === true]);

  const onPresseds = {
    bottom: swipeUp,
    left: swipeRight,
    top: swipeDown,
    right: swipeLeft,
  };

  let IndicatorJSX = null;

  if (depth === 0) {
    IndicatorJSX = renderArrowCategory({
      coords: { d0: coords.d0 },
      maxCoords,
      callbacks: onPresseds,
      clicker: clickArrow,
    });
  } else {
    IndicatorJSX = renderArrowChapter({
      coords,
      maxCoords,
      depth,
      callbacks: onPresseds,
      clicker: clickArrow,
    });
  }

  return (
    <>
      {!isArrowClicked && IndicatorJSX}
      <Animated.View style={[getStyle()]}>{children}</Animated.View>
    </>
  );
};

export default ArrowReader;
