import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useStoreActions } from 'easy-peasy';
import { actionsExecuteAppFirstTime } from '#store/actions';
// import { NavigationScreenOptionsProvider } from '../hooks/useNavigationScreenOptions';

import MainDrawer from './level1/MainDrawer';

export const NavigationProvider = ({ children }) => {
  const executeAppFirstTime = useStoreActions(actionsExecuteAppFirstTime);

  useEffect(() => {
    executeAppFirstTime();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
      {children}
    </NavigationContainer>
  );
};

const RootNavigator = () => <MainDrawer />;
