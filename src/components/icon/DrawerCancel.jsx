import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { drawerCancelIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DrawerCancel = ({ style, onPress }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Image
      style={{
        width: 12,
        height: 12,
      }}
      source={drawerCancelIcon}
    />
  </TouchableOpacity>
);

export default DrawerCancel;
