import React from 'react';
import { Image } from 'react-native';
import { emailIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Email = ({ style }) => (
  <Image
    style={[
      {
        width: 15.1 + 4,
        height: 10.1 + 4,
        position: 'absolute',
        top: '36%',
        left: '7.8%',
      },
      style,
    ]}
    source={emailIcon}
  />
);

export default Email;
