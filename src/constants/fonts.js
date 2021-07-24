import * as Font from 'expo-font';

//www.dafont.com/mont.font
export const regular = 'mont-extra-light-demo';
export const bold = 'mont-heavy-demo';

export const loadFontsAsync = async () => {
  return await Font.loadAsync({
    'mont-extra-light-demo': require('!fonts/Mont-ExtraLightDEMO.otf'),
    'mont-heavy-demo': require('!fonts/Mont-HeavyDEMO.otf'),
  });
};
