import React, { useRef, useState } from 'react';
// expo 에서 불가능! -> rn-cli
// import FastImage from 'react-native-fast-image';
// import Image from 'expo-image';

import {
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  Platform,
  View,
} from 'react-native';
import { Text, StyleSheet } from '#components';

import EventModal from '#components/modals/EventModal';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Card, Button } from 'react-native-elements';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;



const Main = () => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder() {
        return true;
      },

      onPanResponderMove(e, state) {},

      onPanResponderRelease(e, state) {},
    }),
  ).current;

  return (
    <View style={s.root}>
      <Animated.View {...panResponder.panHandlers}>
        <EventModal />
        <Text>Main Screen!</Text>
      </Animated.View>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
