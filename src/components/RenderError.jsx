import React from 'react';
import { View } from 'react-native';
import { Text } from './RN-components/Text';

export const RenderError = ({
  touched = undefined,
  errors = undefined,
  color = '#fff',
}) =>
  touched && errors ? (
    <View>
      <Text fontFamily="bold" style={{ color, textAlign: 'center' }}>
        {errors}
      </Text>
    </View>
  ) : null;
