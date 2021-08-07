import React from 'react';
import { Image } from 'react-native';
import { lockIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Lock = () => (
  <Image
    style={{
      width: 12.5,
      height: 15.4,
      position: 'absolute',
      top: '40%',
      left: '10.8%',
    }}
    source={lockIcon}
  />
);

export default Lock;
