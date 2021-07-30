import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { loadFontsAsync } from './constants/fonts';
import { ReduxProvider } from '#store';
import { NavigationProvider } from '#navigators';

import './Setup';
import './firebase/firebase';

const SplashDelay = 2000;

export default () => {
  const [isLoadingDone, setLoadingDone] = useState(false);

  if (!isLoadingDone) {
    return (
      <AppLoading
        startAsync={() => {
          loadFontsAsync();
          SplashScreen.preventAutoHideAsync();
          setTimeout(SplashScreen.hideAsync, SplashDelay);
        }}
        onFinish={() => {
          setTimeout(() => setLoadingDone(true), SplashDelay);
        }}
        onError={err => console.error(err)}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <NavigationProvider>
          <StatusBar style="auto" />
        </NavigationProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};
