import React, { useState } from "react";
import { Animated, View, Platform } from "react-native";
import { useStoreState } from "easy-peasy";
import { selSwiper, selData } from "../../store/selectors";
import { DEPTH_NAME } from "../../store/reducers/swiper.depth";

import {
  useSwipeGesture,
  useSwipeRight,
  useSwipeLeft,
  useSwipeUp,
  useSwipeDown,
} from "../../hooks";

import {
  renderWithDepth0Arrow,
  renderWithDepth1Arrow,
  renderWithDepth2Arrow,
  renderWithDepth3Arrow,
} from "./ArrowReader.render";
import { useEffect } from "react";

const initStates = () => {
  const chapters = useStoreState(selData.chapters);

  return {
    chapters,
  };
};

const ArrowReader = ({ children }) => {
  const { swipe, getStyle } = useSwipeGesture();
  const [isArrowClicked, clickArrow] = useState(false);

  const { chapters } = initStates();

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

  let IndicatorJSX = null;

  const onPresseds = {
    bottom: swipeUp,
    left: swipeRight,
    top: swipeDown,
    right: swipeLeft,
  };

  switch (depth) {
    case DEPTH_NAME.CATEGORY:
      IndicatorJSX = renderWithDepth0Arrow(
        coords,
        maxCoords,
        onPresseds,
        clickArrow,
      );
      break;

    case DEPTH_NAME.CHAPTER:
      IndicatorJSX = renderWithDepth1Arrow(
        coords,
        chapters,
        onPresseds,
        clickArrow,
      );
      break;

    case DEPTH_NAME.USER_CHAPTER:
      IndicatorJSX = renderWithDepth2Arrow(
        coords,
        maxCoords,
        chapters,
        onPresseds,
        clickArrow,
      );
      break;

    case DEPTH_NAME.NEXT:
      IndicatorJSX = renderWithDepth3Arrow(
        coords,
        maxCoords,
        onPresseds,
        clickArrow,
      );
      break;
  }

  return (
    <>
      {!isArrowClicked && IndicatorJSX}
      <Animated.View style={[getStyle()]}>{children}</Animated.View>
    </>
  );
};

export default ArrowReader;
