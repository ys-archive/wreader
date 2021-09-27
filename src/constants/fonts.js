import * as Font from 'expo-font';

// www.dafont.com/mont.font
export const fonts = {
  xlight: 'mont-extra-light',
  light: 'mont-light',
  thin: 'mont-thin',
  regular: 'mont-regular',
  semibold: 'mont-semi-bold',
  heavy: 'mont-heavy',
};

export const loadFontsAsync = async () => {
  return await Font.loadAsync({
    'mont-extra-light': require('!fonts/Mont-ExtraLight.otf'),
    'mont-light': require('!fonts/Mont-Light.otf'),
    'mont-thin': require('!fonts/Mont-Thin.otf'),
    'mont-regular': require('!fonts/Mont-Regular.otf'),
    'mont-semi-bold': require('!fonts/Mont-SemiBold.otf'),
    'mont-heavy': require('!fonts/Mont-Heavy.otf'),
  });
};
