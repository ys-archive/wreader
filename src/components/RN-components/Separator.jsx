import React from 'react';
import { View } from 'react-native';

export const Separator = ({ width, height, color = '#000' }) => {
  return (
    <View
      style={{
        borderLeftWidth: width,
        height,
        borderLeftColor: color,
      }}
    ></View>
  );
};
