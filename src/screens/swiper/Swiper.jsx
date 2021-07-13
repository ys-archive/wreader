import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';

import { useSwipeLeft } from './hooks/useSwipeLeft';
import { useSwipeRight } from './hooks/useSwipeRight';
import { useSwipeUp } from './hooks/useSwipeUp';
import { useSwipeDown } from './hooks/useSwipeDown';

import SwiperVertical from './SwiperVertical';
import SwiperHorizontal from './SwiperHorizontal';

const Swiper = ({ direction }) => {
  const swipeLeft = useSwipeLeft();
  const swipeRight = useSwipeRight();
  const swipeUp = useSwipeUp();
  const swipeDown = useSwipeDown();

  if (direction === 'top' || direction === 'bottom') {
    return <SwiperVertical direction={direction} />;
  }

  if (direction === 'left' || direction === 'right') {
    return <SwiperHorizontal direction={direction} />;
  }
};

Swiper.propTypes = {
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']).isRequired,
};

export default Swiper;

const s = StyleSheet.create({});
