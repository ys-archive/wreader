// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

class StorageService {
  static async toggleAutoLogin() {
    // await AsyncStorage.setItem('isAutoLogin', !isAutoLogin);
    // const isAutoLogin = await AsyncStorage.getItem('isAutoLogin');

    const isAutoLogin = await SecureStore.getItemAsync('isAutoLogin');
    console.log('isAutoLogin: ', isAutoLogin === 'false' ? 'true' : 'false');
    await SecureStore.setItemAsync(
      'isAutoLogin',
      isAutoLogin === 'false' ? 'true' : 'false',
    );
  }

  static async enableAutoLogin() {
    // await AsyncStorage.setItem('isAutoLogin', true);
    await SecureStore.setItemAsync('isAutoLogin', 'true');
  }

  static async disableAutoLogin() {
    // await AsyncStorage.setItem('isAutoLogin', false);
    await SecureStore.setItemAsync('isAutoLogin', 'false');
    await saveSigninInfo('', '');
  }

  static async saveSigninInfo(email, password) {
    // await AsyncStorage.setItem('email', email);
    // await AsyncStorage.setItem('password', password);
    await SecureStore.setItemAsync('email', email);
    await SecureStore.setItemAsync('password', password);
  }

  static async executeAppFirstTime() {
    // await AsyncStorage.setItem('isFirstExecution', false);
    await SecureStore.setItemAsync('isFirstExecution', 'false');
  }
}
// (async () => {
//   await StorageService.disableAutoLogin();
//   await StorageService.saveSigninInfo('', '');
//   await SecureStore.setItemAsync('isFirstExecution', 'true');
// })();

export default StorageService;
