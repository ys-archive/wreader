import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';
import Swiper from 'react-native-swiper';

const SwiperHorizontal = ({ direction }) => {
  return (
    <Swiper showsButtons horizontal bounces>
      <View>
        <Text></Text>
      </View>
    </Swiper>
  );
};

export default SwiperHorizontal;

const styles = StyleSheet.create({});
