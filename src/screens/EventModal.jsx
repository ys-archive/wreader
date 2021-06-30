import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const EventModal = () => {
  const nav = useNavigation();

  return (
    <View>
      <Text>Event Modal Screen!</Text>
      <Button
        title="Close Modal"
        onPress={() => {
          nav.goBack();
        }}
      />
    </View>
  );
};

export default EventModal;

const styles = StyleSheet.create({});
