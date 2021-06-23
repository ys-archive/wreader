import { StyleSheet as original_StyleSheet, Platform } from 'react-native';

export const StyleSheet = {
  create(styles) {
    const platformStyles = {};
    for (const k in styles) {
      const { ios, android, ...style } = styles[k];
      (ios || android) &&
        Object.assign(platformStyles, Platform.select({ ios, android }));
      platformStyles[k] = style;
    }
    return original_StyleSheet.create(platformStyles);
  },
};
