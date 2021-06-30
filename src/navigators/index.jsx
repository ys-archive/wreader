import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigatorsProvider } from '../hooks/useNavigators';
import { NavigationScreenOptionsProvider } from '../hooks/useNavigationScreenOptions';

import * as ScreenNames from './ScreenNames';

import EventModal from '../screens/EventModal';
import MainDrawer from './MainScreen/MainDrawer';

export const NavigationProvider = ({ children }) => (
  <NavigationContainer>
    <RootNavigator />
    {children}
  </NavigationContainer>
);

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

// main screen
// drawer
//   - my profile
//   - contact us list
//
//   - policy and condition

const MainDrawerScreenOptions = {
  headerShown: false,
};

const MainStackScreenOptions = {
  headerShown: false,
};

const RootNavigator = () => (
  <NavigatorsProvider mainStack={MainStack} drawer={Drawer}>
    <NavigationScreenOptionsProvider
      mainDrawerScreenOptions={MainDrawerScreenOptions}
      mainStackScreenOptions={MainStackScreenOptions}
    >
      <MainDrawer />
    </NavigationScreenOptionsProvider>
  </NavigatorsProvider>
);
