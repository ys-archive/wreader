import * as Font from 'expo-font';

export const regular = 'open-sans';
export const bold = 'open-sans-bold';

export const loadFontsAsync = async () => {
  await Font.loadAsync({
    'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
  });
};
