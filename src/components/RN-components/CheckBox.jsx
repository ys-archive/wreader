import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CheckBox = () => {
  const [checked, onChange] = useState(false);
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => onChange(!checked)}
    >
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: 'coral',
  },

  appContainer: {
    flex: 1,
    alignItems: 'center',
  },

  appTitle: {
    marginVertical: 16,
    // fontWeight: 'bold',
    fontSize: 24,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxLabel: {
    marginLeft: 8,
    // fontWeight: 500,
    fontSize: 18,
  },
});
