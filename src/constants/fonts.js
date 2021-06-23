import * as Font from 'expo-font';

export async function loadFontsAsync() {
  await Font.loadAsync({
    'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
  });
}
