import React from 'react';
import { Image } from 'react-native';
import { wreaderCircleLogo } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LogoCircle = ({ style = {} }) => (
  <Image
    style={[
      {
        width: 24,
        height: 24,
        //   position: 'absolute',
        //   top: '25.5%',
      },
      style,
    ]}
    source={wreaderCircleLogo}
    resizeMode="contain"
  />
);

export default LogoCircle;
