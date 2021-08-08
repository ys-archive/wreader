import React from 'react';
import { Image } from 'react-native';
import { lockIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LockFindPassword = ({ style }) => (
  <Image
    style={[
      {
        width: 97.7 + 20,
        height: 121 + 23,
      },
      style,
    ]}
    source={lockIcon}
  />
);

export default LockFindPassword;
