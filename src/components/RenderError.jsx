import React from 'react';
import { View } from 'react-native';
import { Text } from './RN-components/Text';

export const RenderError = ({
  touched = undefined,
  errors = undefined,
  color = '#fff',
  isBold = false,
}) =>
  touched && errors ? (
    <View>
      <Text isBold={isBold} style={{ color }}>
        {errors}
      </Text>
    </View>
  ) : null;
