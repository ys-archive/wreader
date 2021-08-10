import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  async getItem(key) {
    console.log('getItem: ', key);
    return JSON.parse(
      await AsyncStorage.getItem(key, (err, res) => {
        console.log(err, res);
      }),
    );
  },
  setItem(key, data) {
    console.log('setItem: ', key, ' : ', data);
    AsyncStorage.setItem(key, JSON.stringify(data));
  },
  removeItem(key) {
    console.log('removeItem: ', key);
    AsyncStorage.removeItem(key);
  },
};

export default storage;
