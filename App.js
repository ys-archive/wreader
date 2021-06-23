// import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { NavigationProvider } from '#navigators';
import { ReduxProvider } from './src/store';

import Signin from './src/screens/auth/sign-in/Signin';

const App = () => (
  <SafeAreaProvider>
    <ReduxProvider>
      <Signin />
      {/* <NavigationProvider>
          <StatusBar style="auto" />
        </NavigationProvider> */}
    </ReduxProvider>
  </SafeAreaProvider>
);

export default App;
