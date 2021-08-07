import React from 'react';
import { Image } from 'react-native';
import { passwordLockIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LockPassword = () => (
  <Image
    style={{
      width: 12.5 + 4,
      height: 15.4 + 4,
      position: 'absolute',
      top: '30%',
      left: '8%',
    }}
    source={passwordLockIcon}
  />
);

export default LockPassword;
