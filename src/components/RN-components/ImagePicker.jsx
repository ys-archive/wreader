import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { StyleSheet } from './StyleSheet';
import { Button } from './Button';
import { useImagePicker } from '../../hooks';

export const ImagePicker = ({ buttonStyle = {}, imageStyle = {}, ...rest }) => {
  const { imageUri: uri, pickImage } = useImagePicker();

  return (
    <View style={s.root}>
      <Button onPress={pickImage} style={[s.button, buttonStyle]}>
        Pick an image from camera roll
      </Button>
      {uri !== 'undefined' && (
        <Image {...rest} style={[s.image, imageStyle]} source={{ uri }} />
      )}
    </View>
  );
};

ImagePicker.propTypes = {
  buttonStyle: PropTypes.object,
  imageStyle: PropTypes.object,
};

ImagePicker.defaultProps = {
  buttonStyle: {},
  imageStyle: {},
};

const s = StyleSheet.create({
  root: {},
  button: {},
  image: {
    width: 200,
    height: 200,
  },
});
