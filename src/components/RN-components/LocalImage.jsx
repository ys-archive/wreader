import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { StyleSheet } from './StyleSheet';
import { getImagePathByScreenResolution } from '#utils';

export const LocalImage = ({ uri, style = {}, ...rest }) => {
  // TODO: mdpi, hdpi, xdpi, xxdpi, xxxdpi 키워드 별로 정해줌 (5가지)
  const actualUri = getImagePathByScreenResolution(uri);
  return (
    <Image {...rest} source={{ uri: actualUri }} style={[style, s.root]} />
  );
};

LocalImage.PropTypes = {
  uri: PropTypes.string.isRequired,
  style: PropTypes.object,
};

LocalImage.defaultProps = {
  style: {},
};

const s = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
