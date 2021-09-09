import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '../components';

import { useStoreState } from 'easy-peasy';
import { selSwiper, selData } from '../store/selectors';
import { DEPTH_NAME } from '../store/reducers/swiper.depth';

import ChapterIndicatorCard from '../components/reader-card/chapter/chapter-card/ChapterIndicatorCard';
import CategoryIndicatorCard from '../components/reader-card/category/CategoryIndicatorCard';

const initStates = () => {
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);
  const depth = useStoreState(selSwiper.depth);
  const isLoaded = useStoreState(selData.isLoaded);

  return {
    coords,
    maxCoords,
    depth,
    isLoaded,
  };
};

const indicatorPos = {
  top: '-80%',
  bottom: '-80%',
  left: '-87%',
  right: '-87%',
};

const MakeIndicators = dir => {
  return Object.entries(dir).map((d, i) => {
    const [direction, set] = d;
    const [has, isCategory] = set;
    console.log(direction, has, isCategory);

    if (has) {
      return isCategory === 0 ? (
        <CategoryIndicatorCard
          key={i}
          pos={{ position: 'absolute', [direction]: indicatorPos[direction] }}
        />
      ) : (
        <ChapterIndicatorCard
          key={i}
          pos={{ position: 'absolute', [direction]: indicatorPos[direction] }}
        />
      );
    }
  });
};

const CardIndicator = ({ children }) => {
  const { coords, maxCoords, depth, isLoaded } = initStates();
  const { d0, d1, d2, d3 } = coords;
  const { d0: md0, d1: md1, d2: md2, d3: md3 } = maxCoords;

  if (!isLoaded) return null;

  let IndicatorJSX = undefined;

  switch (depth) {
    case DEPTH_NAME.CATEGORY:
      IndicatorJSX = renderWithDepth0(d0, md0, md1);
      break;

    case DEPTH_NAME.CHAPTER:
      IndicatorJSX = renderWithDepth1(d1, md1, md2);
      break;

    case DEPTH_NAME.USER_CHAPTER:
      IndicatorJSX = renderWithDepth2(d2, md2, md3);
      break;

    case DEPTH_NAME.NEXT:
      IndicatorJSX = renderWithDepth3(d3, md3);
      break;
  }

  return (
    <>
      {IndicatorJSX}
      {children}
    </>
  );
};

const renderWithDepth0 = (d0, md0, md1) => {
  const hasPrvCategory = d0 !== 0 && d0 < md0;
  const hasNextCategory = d0 < md0 - 1;
  const hasChapter = md1 !== 0;

  return MakeIndicators({
    top: [hasPrvCategory, 0],
    bottom: [hasNextCategory, 0],
    right: [hasChapter, 1],
  });
};

const renderWithDepth1 = (d1, md1, md2) => {
  const hasCategory = d1 === 0;
  const hasPrvChapter = d1 !== 0;
  const hasNextChapter = d1 < md1 - 1;
  const hasUserChapter = md2 > 0;

  return MakeIndicators({
    left: hasCategory ? [hasCategory, 0] : hasPrvChapter && [hasPrvChapter, 1],
    right: [hasNextChapter, 1],
    bottom: [hasUserChapter, 1],
  });
};

const renderWithDepth2 = (d2, md2, md3) => {
  const hasChapter = d2 === 0;
  const hasPrvUserChapter = d2 !== 0;
  const hasNextUserChapter = d2 < md2 - 1;
  const hasUserNext = md3 !== 0;

  return MakeIndicators({
    top: hasChapter
      ? [hasChapter, 1]
      : hasPrvUserChapter && [hasPrvUserChapter, 1],
    right: [hasUserNext, 1],
    bottom: [hasNextUserChapter, 1],
  });
};

const renderWithDepth3 = (d3, md3) => {
  const hasUserChapter = d3 === 0;
  const hasPrvUserNext = d3 !== 0;
  const hasNextUserNext = d3 < md3 - 1;

  return MakeIndicators({
    left: hasUserChapter
      ? [hasUserChapter, 1]
      : hasPrvUserNext && [hasPrvUserNext, 1],
    right: [hasNextUserNext, 1],
  });
};

export default CardIndicator;
