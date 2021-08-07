import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CheckBox = ({
  isChecked = false,
  onChange,
  highlightColor = '#fff',
}) => (
  <Pressable
    style={[s.checkboxBase, isChecked && { backgroundColor: highlightColor }]}
    onPress={onChange}
  >
    {isChecked && <Ionicons name="checkmark" size={24} color="white" />}
  </Pressable>
);

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  highlightColor: PropTypes.string,
};

CheckBox.defaultProps = {
  highlightColor: '#fff',
};

const s = StyleSheet.create({
  checkboxBase: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
});
