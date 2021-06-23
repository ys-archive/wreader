// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ReduxProvider } from './src/store';
// import { NavigationProvider } from '#navigators';
import Signin from './src/screens/auth/sign-in/Signin';
import { loadFontsAsync } from './src/constants/fonts';
import Signup from './src/screens/auth/sign-up/Signup';

enableScreens();

const App = () => {
  const [isLoadingDone, setLoadingDone] = useState(false);

  if (!isLoadingDone) {
    return (
      <AppLoading
        startAsync={loadFontsAsync}
        onFinish={() => setLoadingDone(true)}
        onError={err => console.error(err)}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <ReduxProvider>
        {/* <Signin /> */}
        <Signup />
        {/* <NavigationProvider>
          <StatusBar style="auto" />
        </NavigationProvider> */}
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default App;
