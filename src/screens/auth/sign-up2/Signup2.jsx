import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text } from '#components';

import Signup2Form from './components/Signup2Form';

const Signup2 = ({ route }) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <View style={s.root}>
        <Text style={s.accountInfoInstruction} isBold>
          ※ 기본정보
        </Text>
        <Signup2Form route={route} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup2;

const s = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: '25%',
    marginHorizontal: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  accountInfoInstruction: {
    alignSelf: 'flex-start',
    // marginBottom: 50,
  },
});
