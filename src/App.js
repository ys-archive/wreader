// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ReduxProvider } from './store';
// import { NavigationProvider } from '#navigators';
import Signin from './screens/auth/sign-in/Signin';
import { loadFontsAsync } from './constants/fonts';
import Signup from './screens/auth/sign-up/Signup';
import Signup2 from './screens/auth/sign-up2/Signup2';
import FindPassword from './screens/auth/find-password/FindPassword';
import ChangePassword from './screens/auth/change-password/ChangePassword';

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
        <Signin />
        {/* <Signup /> */}
        {/* <Signup2 /> */}
        {/* <FindPassword /> */}
        {/* <ChangePassword /> */}
        {/* <NavigationProvider>
          <StatusBar style="auto" />
        </NavigationProvider> */}
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default App;
