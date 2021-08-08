import React from 'react';
import { Image } from 'react-native';
import { instagramIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Instagram = ({ style }) => (
  <Image
    style={[
      {
        width: 15 + 4,
        height: 15 + 4,
        position: 'absolute',
        top: '36%',
        left: '7.8%',
      },
      style,
    ]}
    source={instagramIcon}
  />
);

export default Instagram;
