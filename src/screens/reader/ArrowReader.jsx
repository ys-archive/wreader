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
  renderWithDepth4Arrow,
} from "./ArrowReader.render";
import { useEffect } from "react";

const initStates = () => {
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);
  const depth = useStoreState(selSwiper.depth);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);

  return {
    coords,
    maxCoords,
    depth,
    chapters,
    isLoaded,
  };
};

const ArrowReader = ({ children }) => {
  const { swipe, getStyle } = useSwipeGesture();
  const [isArrowClicked, clickArrow] = useState(false);

  const { coords, maxCoords, depth, chapters, isLoaded } = initStates();

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
    case 0:
      IndicatorJSX =
        isLoaded.d1 &&
        renderWithDepth0Arrow(coords, maxCoords, onPresseds, clickArrow);
      break;

    case 1:
      IndicatorJSX =
        isLoaded.d2 &&
        renderWithDepth1Arrow(coords, maxCoords, onPresseds, clickArrow);
      break;

    case 2:
      IndicatorJSX =
        isLoaded.d3 &&
        renderWithDepth2Arrow(coords, maxCoords, onPresseds, clickArrow);
      break;

    case 3:
      IndicatorJSX =
        isLoaded.d4 &&
        renderWithDepth3Arrow(coords, maxCoords, onPresseds, clickArrow);
      break;

    case 4:
      IndicatorJSX =
        // isLoaded.d5 &&
        renderWithDepth4Arrow(coords, maxCoords, onPresseds, clickArrow);
      break;

    // case 5:
    //   IndicatorJSX =
    //     isLoaded.d4 &&
    //     renderWithDepth5Arrow(
    //       coords,
    //       maxCoords,
    //       chapters,
    //       onPresseds,
    //       clickArrow,
    //     );
    //   break;

    // case 6:
    //   IndicatorJSX =
    //     isLoaded.d5 &&
    //     renderWithDepth6Arrow(
    //       coords,
    //       maxCoords,
    //       chapters,
    //       onPresseds,
    //       clickArrow,
    //     );
    //   break;

    // case 7:
    //   IndicatorJSX =
    //     isLoaded.d6 &&
    //     renderWithDepth7Arrow(
    //       coords,
    //       maxCoords,
    //       chapters,
    //       onPresseds,
    //       clickArrow,
    //     );
    //   break;

    // case 8:
    //   IndicatorJSX =
    //     isLoaded.d7 &&
    //     renderWithDepth8Arrow(
    //       coords,
    //       maxCoords,
    //       chapters,
    //       onPresseds,
    //       clickArrow,
    //     );
    //   break;

    // case 9:
    //   IndicatorJSX =
    //     isLoaded.d8 &&
    //     renderWithDepth9Arrow(
    //       coords,
    //       maxCoords,
    //       chapters,
    //       onPresseds,
    //       clickArrow,
    //     );
    //   break;
  }

  return (
    <>
      {!isArrowClicked && IndicatorJSX}
      <Animated.View style={[getStyle()]}>{children}</Animated.View>
    </>
  );
};

export default ArrowReader;
