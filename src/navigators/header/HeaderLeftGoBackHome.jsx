import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const HeaderLeftGoBackHome = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation?.goBack()}>
    <AntDesign
      name="arrowleft"
      size={25}
      color="#000"
      style={{ marginLeft: 15 }}
    />
  </TouchableOpacity>
);

export default HeaderLeftGoBackHome;
