import React, { useState, useEffect, useCallback } from 'react';
// import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
// import * as Font from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { loadFontsAsync } from './constants/fonts';
import { ReduxProvider } from '#store';
import { NavigationProvider } from '#navigators';

import './Setup';

export default () => {
  const [isLoadingDone, setLoadingDone] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log('app loading!');
  //       // Keep the splash screen visible while we fetch resources
  //       await SplashScreen.preventAutoHideAsync();
  //       // Pre-load fonts
  //       await Font.loadAsync({
  //         'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
  //         'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
  //       });
  //       // Artificially delay for 2 seconds to simulate a slow loading experience,
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setLoadingDone(true);
  //     }
  //   })();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (isLoadingDone) {
  //     // hide splash screen immediately! if we call this after 'setLoadingDone',
  //     // then we may see a blank screen while the app is loading its initial
  //     // state and rendering its first pixel.
  //     // so instead, we hide the splash scren once we know the root view has already performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isLoadingDone]);

  // if (!isLoadingDone) {
  //   return null;
  // }

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
      {/* <View
        onLayout={onLayoutRootView}
        // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      > */}
      <ReduxProvider>
        <NavigationProvider>
          <StatusBar style="auto" />
        </NavigationProvider>
      </ReduxProvider>
      {/* </View> */}
    </SafeAreaProvider>
  );
};
