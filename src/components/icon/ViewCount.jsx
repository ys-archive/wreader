import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { viewCountIcon } from '#constants/images';

const ViewCount = ({ onPress }) => (
  // style={{ zIndex: 1000 }}
  <TouchableOpacity onPress={onPress}>
    <Image
      style={{
        width: 16,
        height: 14.4,
      }}
      source={viewCountIcon}
    />
  </TouchableOpacity>
);

export default ViewCount;
