import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import EventModal from '#components/modals/EventModal';

const Main = () => {
  return (
    <View style={s.root}>
      <EventModal />
      <Text>Main Screen!</Text>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
