import React from 'react';
import { Image } from 'react-native';
import { logoIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LogoSignin = () => (
  <Image
    style={{
      width: '77.4%',
      // height: '11.5%',
      position: 'absolute',
      top: '25.5%',
    }}
    source={logoIcon}
    resizeMode="contain"
  />
);

export default LogoSignin;
