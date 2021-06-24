import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export const Separator = ({
  direction,
  width,
  height,
  color = '#000',
  style = {},
}) => {
  if (typeof direction !== 'string') {
    throw new Error(
      "Direction of Separator must be either 'vertical' or 'horizontal'",
    );
  }
  const dir = direction.trim().toLowerCase();
  const isVertical = dir === 'vertical';

  const s = isVertical
    ? {
        borderLeftWidth: width,
        height,
        borderLeftColor: color,
      }
    : {
        borderBottomWidth: height,
        width,
        borderBottomColor: color,
      };

  return <View style={{ ...s, ...style }} />;
};

Separator.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  // width: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // height: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

Separator.defaultProps = {
  color: '#000',
  style: {},
};
