import React from 'react';
import { Image } from 'react-native';
import { viewCountIcon } from '#constants/images';

const ViewCount = () => (
  <Image
    style={{
      width: 16,
      height: 14.4,
    }}
    source={viewCountIcon}
  />
);

export default ViewCount;
