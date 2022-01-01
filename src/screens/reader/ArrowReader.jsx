import React, { useState } from "react";
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

import { renderCategoryArrow, renderChapterArrow } from "./ArrowReader.render";
import { useEffect } from "react";

const initStates = () => {
  const depth = useStoreState(selSwiper.depth);
  const isLoaded = useStoreState(selData.isLoaded);

  return {
    depth,
    isLoaded,
  };
};

const ArrowReader = ({ children }) => {
  const { swipe, getStyle } = useSwipeGesture();
  const [isArrowClicked, clickArrow] = useState(false);

  const { depth, isLoaded } = initStates();

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

  if (!isLoaded) {
    return null;
  }

  const onPresseds = {
    bottom: swipeUp,
    left: swipeRight,
    top: swipeDown,
    right: swipeLeft,
  };

  let IndicatorJSX = null;
  if (depth === 0) {
    IndicatorJSX = renderCategoryArrow(onPresseds, clickArrow);
  } else {
    IndicatorJSX = renderChapterArrow(onPresseds, clickArrow);
  }

  return (
    <>
      {!isArrowClicked && IndicatorJSX}
      <Animated.View style={[getStyle()]}>{children}</Animated.View>
    </>
  );
};

export default ArrowReader;
