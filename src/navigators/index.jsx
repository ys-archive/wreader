import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import { NavigationScreenOptionsProvider } from '../hooks/useNavigationScreenOptions';

import MainDrawer from './level1/MainDrawer';

import StorageService from '../services/StorageService';

export const NavigationProvider = ({ children }) => {
  // const executeAppFirstTime = useStoreActions(actionsExecuteAppFirstTime);

  useEffect(() => {
    (async () => {
      await StorageService.executeAppFirstTime();
    })();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
      {children}
    </NavigationContainer>
  );
};

const RootNavigator = () => <MainDrawer />;
