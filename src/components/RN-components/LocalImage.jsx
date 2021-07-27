import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { StyleSheet } from './StyleSheet';
import { getImagePathByScreenResolution } from '#utils';

export const LocalImage = ({
  source,
  isResolutionImage = false,
  style = {},
  ...rest
}) => {
  // TODO: mdpi, hdpi, xdpi, xxdpi, xxxdpi 키워드 별로 정해줌 (5가지)
  if (isResolutionImage) {
    const actualUri = getImagePathByScreenResolution(source);
    return (
      <Image {...rest} source={{ uri: actualUri }} style={[style, s.root]} />
    );
  } else {
    return <Image {...rest} source={source} style={[style, s.root]} />;
  }
};

LocalImage.propTypes = {
  isResolutionImage: PropTypes.bool,
  style: PropTypes.object,
};

LocalImage.defaultProps = {
  isResolutionImage: false,
  style: {},
};

const s = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
