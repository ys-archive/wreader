import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ScreenNames from '../ScreenNames';

const GoToMain = ({ navigation, direction = 'left' }) => (
  <TouchableOpacity onPress={() => navigation?.navigate(ScreenNames.MainStack)}>
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

export default GoToMain;
