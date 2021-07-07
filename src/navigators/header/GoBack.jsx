import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const GoBack = ({ navigation, direction = 'left' }) => (
  <TouchableOpacity onPress={() => navigation?.goBack()}>
    <AntDesign
      name={direction === 'left' ? 'arrowleft' : 'arrowright'}
      size={25}
      color="#000"
      style={{ marginLeft: 15 }}
    />
  </TouchableOpacity>
);

GoBack.propTypes = {
  navigation: PropTypes.object.isRequired,
  direction: PropTypes.oneOf(['left', 'right']),
};

GoBack.defaultProps = {
  direction: 'left',
};

export default GoBack;
