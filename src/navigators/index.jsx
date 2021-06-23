import React from 'react';
import { NavigatorsProvider } from '../hooks/useNavigators';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNav from './stack/StackNav';

export const NavigationProvider = ({ children }) => (
  <NavigationContainer>
    <RootNavigator />
    {children}
  </NavigationContainer>
);

const stack = createStackNavigator();
const drawer = createDrawerNavigator();

const RootNavigator = () => (
  <NavigatorsProvider stack={stack} drawer={drawer}>
    <StackNav />
  </NavigatorsProvider>
);
