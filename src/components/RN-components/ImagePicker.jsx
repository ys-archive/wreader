import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { StyleSheet, Button } from '../components';
import { useImagePicker } from '../../hooks';

const ImagePicker = ({
  buttonStyle = {},
  imageStyle = {},
  resizeMode = 'contain',
}) => {
  const { imageUri: uri, pickImage } = useImagePicker();

  return (
    <View style={s.root}>
      <Button onPress={pickImage} style={[s.button, buttonStyle]}>
        Pick an image from camera roll
      </Button>
      {uri !== 'undefined' && (
        <Image
          style={[s.image, imageStyle]}
          source={{ uri }}
          resizeMode={resizeMode}
        />
      )}
    </View>
  );
};

ImagePicker.propTypes = {
  buttonStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  resizeMode: PropTypes.oneOf([
    'contain',
    'cover',
    'stretch',
    'repeat',
    'center',
  ]),
};

ImagePicker.defaultProps = {
  buttonStyle: {},
  imageStyle: {},
  resizeMode: 'contain',
};

export default ImagePicker;

const s = StyleSheet.create({
  root: {},
  button: {},
  image: {
    width: 200,
    height: 200,
  },
});
