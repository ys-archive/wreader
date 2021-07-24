import { StyleSheet as original_StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const StyleSheet = {
  create(styles) {
    const platformStyles = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const k in styles) {
      // ios, android, width, height 프로퍼티 destruct
      const { ios, android, width, height, ...style } = styles[k];

      // ios 와 android 는 각자 Platform 고유 프로퍼티로 select
      (ios || android) &&
        Object.assign(platformStyles, Platform.select({ ios, android }));

      // width 와 height 는 wp, dp 값으로 대입
      // TODO: 반응형 styling property 모두 여기로
      (width || height) &&
        Object.assign(platformStyles, { width: wp(width), height: hp(height) });
      platformStyles[k] = style;
    }
    return original_StyleSheet.create(platformStyles);
  },
};
