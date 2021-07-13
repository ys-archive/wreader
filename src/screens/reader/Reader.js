import React from 'react';
import { Animated } from 'react-native';
import { StyleSheet } from '#components';
import { useReaderAnimated } from '#hooks';

const Reader = ({ children }) => {
  const { getCardStyle, panResponder } = useReaderAnimated();

  return (
    <Animated.View
      style={[
        getCardStyle(),
        // { position: 'absolute', width: SCREEN_WIDTH },
      ]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default Reader;

const s = StyleSheet.create({});
