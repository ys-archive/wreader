import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Reader from './reader/reader';

const ReaderMain = ({ rootData }) => {
  // TODO: 1. get root category informations by invoking GET Category from the server
  // TODO: 2. fill up the array with 1.
  // TODO: 3. request the chaining chapters by calling GET Chapter recursively and compare the categoryIdx to verify
  // TODO: 4. fill up the array with 3.
  // TODO: 5. render

  return (
    <View>
      <Reader>
        
      </Reader>
    </View>
  );
};

export default ReaderMain;

const styles = StyleSheet.create({});
