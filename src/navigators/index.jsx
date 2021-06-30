import React from 'react';
import { NavigatorsProvider } from '../hooks/useNavigators';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as ScreenNames from './ScreenNames';

import EventModal from '../screens/EventModal';
import MainDrawer from './MainScreen/MainDrawer';

export const NavigationProvider = ({ children }) => (
  <NavigationContainer>
    <RootNavigator />
    {children}
  </NavigationContainer>
);

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

// main screen
// drawer
//   - my profile
//   - contact us list
//
//   - policy and condition

const RootStackScreenOptions = {
  headerShown: false,
};

const RootNavigator = () => (
  <NavigatorsProvider mainStack={MainStack} drawer={Drawer}>
    <MainDrawer />
    {/* <RootStack.Navigator mode="modal" screenOptions={RootStackScreenOptions}>
      <RootStack.Screen name={ScreenNames.MainDrawer} component={MainDrawer} />
      <RootStack.Screen name={ScreenNames.EventModal} component={EventModal} />
    </RootStack.Navigator> */}
  </NavigatorsProvider>
);
