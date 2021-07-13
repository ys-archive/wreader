import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';
import Swiper from 'react-native-swiper';

const SwiperVertical = ({ direction }) => {
  return (
    <Swiper showsButtons bounces>
      <View>
        <Text></Text>
      </View>
    </Swiper>
  );
};

export default SwiperVertical;

const styles = StyleSheet.create({});
