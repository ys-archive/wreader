import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const ReaderCategory = ({ categoryData }) => {
  const { id, title, subTitle, img, chapter } = categoryData;
  //   const [state, setState] = useState(data);

  return (
    <View>
      <Text>{title}</Text>
      <Text>{subTitle}</Text>
      <Image source={{ uri: img }} />
      
    </View>
  );
};

export default ReaderCategory;

const styles = StyleSheet.create({});
