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

const RootNavigator = () => <MainDrawer />;
