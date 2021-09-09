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
  top: '-83%',
  bottom: '-83%',
  left: '-88%',
  right: '-88%',
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

  const IndicatorJSX =
    depth === 0
      ? renderWithDepthD0(d0, md0, md1)
      : renderWithDepths(depth, coords, maxCoords);

  return (
    <>
      {IndicatorJSX}
      {children}
    </>
  );
};

const renderWithDepthD0 = (d0, md0, md1) => {
  const hasPrvCategory = d0 !== 0 && d0 < md0;
  const hasNextCategory = d0 < md0 - 1;
  const hasChapter = md1 !== 0;

  return MakeIndicators({
    top: [hasPrvCategory, 0],
    bottom: [hasNextCategory, 0],
    right: [hasChapter, 1],
  });
};

const renderWithDepths = (depth, coords, maxCoords) => {
  const { d0, d1, d2, d3 } = coords;
  const { d0: md0, d1: md1, d2: md2, d3: md3 } = maxCoords;
  // initialCategoryIndicators({ left: true })
  switch (depth) {
    case DEPTH_NAME.CHAPTER:
      // todo: 카테고리 렌더 || 이전 챕터
      const hasPrvCategory = d1 === 0;
      const hasPrvChapter = d1 !== 0;

      // todo: 다음 챕터가 있으면
      const hasNextChapter = d1 < md1 - 1;

      // todo: 해당 챕터에 유저챕터가 있으면
      const hasUserChapter = md2 !== 0;

      return MakeIndicators({
        left: hasPrvCategory
          ? [hasPrvCategory, 0]
          : hasPrvChapter && [hasPrvChapter, 1],
        right: [hasNextChapter, 1],
        bottom: [hasUserChapter, 1],
      });

    case DEPTH_NAME.USER_CHAPTER:
      // todo: 챕터 렌더 || 이전 유저 챕터
      // position: 'absolute',
      // top: '-5%'

      // todo: NEXT 유저 챕터 있으면
      // position: 'absolute',
      // right: '-5%'

      // todo: 다음 유저 챕터
      // position: 'absolute',
      // bottom: '-7%'
      break;

    case DEPTH_NAME.NEXT:
      // todo: 유저 챕터 || 이전 NEXT 챕터
      // position: 'absolute',
      // left: '-5%'

      // todo: 다음 NEXT 챕터
      // position: 'absolute',
      // right: '-5%'
      break;
  }
};

export default CardIndicator;

const s = StyleSheet.create({});
