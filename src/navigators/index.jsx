import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import { NavigationScreenOptionsProvider } from '../hooks/useNavigationScreenOptions';

import MainDrawer from './level1/MainDrawer';

export const NavigationProvider = ({ children }) => (
  <NavigationContainer>
    <RootNavigator />
    {children}
  </NavigationContainer>
);

// const MainDrawerScreenOptions = {
//   // headerShown: false,
// };

// const MainStackScreenOptions = {
//   // headerShown: false,
// };

const RootNavigator = () => (
  <MainDrawer />
  // <NavigationScreenOptionsProvider
  //   mainDrawerScreenOptions={MainDrawerScreenOptions}
  //   mainStackScreenOptions={MainStackScreenOptions}
  // >
  // </NavigationScreenOptionsProvider>
);
