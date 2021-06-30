import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const nav = useNavigation();
  return (
    <View>
      <Text>Main Page</Text>
      <Button
        title="Open Modal"
        onPress={() => {
          nav.navigate('EventModal');
        }}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
