import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '../components';

import { useStoreState } from 'easy-peasy';
import { selSwiper } from '../store/selectors';
import { DEPTH_NAME } from '../store/reducers/swiper.depth';

const initStates = () => {
  const coords = useStoreState(selSwiper.coords);
  const depth = useStoreState(selSwiper.depth);

  return {
    coords,
    depth,
  };
};

const CardIndicator = ({ children }) => {
  const { coords, depth } = initStates();
  const { d0, d1, d2, d3 } = coords;

  const IndicatorJSX = renderByDepth(depth, children);

  return IndicatorJSX;
};

const renderByDepth = (depth, children) => {
  switch (depth) {
    case DEPTH_NAME.CATEGORY:
      // todo: 이전 카테고리가 있으면
      // position: 'absolute',
      // top: '-5%'

      // todo: 다음 카테고리가 있으면
      // position: 'absolute',
      // bottom: '-7%'

      // todo: 가진 챕터가 있으면
      // position: 'absolute',
      // right: '-5%'
      break;

    case DEPTH_NAME.CHAPTER:
      // todo: 카테고리 렌더 || 이전 챕터
      // position: 'absolute',
      // left: '-5%'
      // 배경화면 -> categories[d0] 의 imgURL

      // todo: 다음 챕터가 있으면
      // position: 'absolute',
      // right: '-5%'

      // todo: 해당 챕터에 유저챕터가 있으면
      // position: 'absolute',
      // bottom: '-7%'
      break;

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
