import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Image, PixelRatio, Platform } from 'react-native';
import { StyleSheet } from '../';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as dp,
} from 'react-native-responsive-screen';

// TODO: mdpi, hdpi, xdpi, xxdpi, xxxdpi 키워드 별로 정해줌 (5가지)

const Image = ({ url, resizeMode = 'contain', style = {}, ...rest }) => {
  const getTargetPreset =
    (() => {
      if (url === '') {
        throw new Error('url 이 비어있으면 안 됩니다!');
      }

      const ratio = PixelRatio.get();

      // android - mdpi
      // ios - x
      if (ratio < 1) {
      }

      // android - hdpi
      // ios - x
      if (ratio <= 1 && ratio < 2) {
      }

      // android - xhdpi
      // ios - iPhone se, 6s, 7, 8, xr, 11
      if (ratio <= 2 && ratio < 3) {
      }

      // android - xxhdpi, pixel, pixel2
      // ios - 6s+, 7+, 8+, x, xs, xs max, 11 pro, 11 pro max
      if (ratio <= 3 && ratio < 3.5) {
      }

      // anroid - xxxhdpi, pixel xl, pixel 2 xl, nexus 6
      // ios - x
      if (ratio >= 3.5) {
      }
    },
    [url]);

  return (
    <Image
      style={[style, s.root]}
      source={{ url }}
      resizeMode={resizeMode}
      {...rest}
    />
  );
};

export default Image;

Image.propTypes = {
  url: PropTypes.string.isRequired(),
  resizeMode: PropTypes.oneOf([
    'cover',
    'contain',
    'stretch',
    'repeat',
    'center',
  ]),
  style: PropTypes.object,
};

Image.defaultProps = {
  resizeMode: 'contain',
  style: {},
};

const s = StyleSheet.create({
  root: {
    width: {},
  },
});
