import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ScreenNames from '../ScreenNames';

const HeaderRightGoBackSignin = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation?.navigate(ScreenNames.Signin)}>
    <AntDesign
      name="close"
      size={25}
      color="#000"
      style={{ marginRight: 15 }}
    />
  </TouchableOpacity>
);

export default HeaderRightGoBackSignin;
