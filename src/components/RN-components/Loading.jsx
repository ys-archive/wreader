import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = props => {
  const { style = {} } = props;
  return <ActivityIndicator style={style} animating {...props} />;
};

export default Loading;
