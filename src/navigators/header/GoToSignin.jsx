import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ScreenNames from '../ScreenNames';

const GoBackSignin = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation?.navigate(ScreenNames.SigninStack)}
  >
    <AntDesign
      name="close"
      size={25}
      color="#000"
      style={{ marginRight: 15 }}
    />
  </TouchableOpacity>
);

GoBackSignin.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GoBackSignin;
