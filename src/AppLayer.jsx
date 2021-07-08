import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { loadFontsAsync } from './constants/fonts';
import { ReduxProvider } from '#store';
import { NavigationProvider } from '#navigators';

import './Setup';

export default function () {
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
        <NavigationProvider>
          <StatusBar style="auto" />
        </NavigationProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
