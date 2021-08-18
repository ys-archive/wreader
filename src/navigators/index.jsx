import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ChapterDataProvider } from '../contexts/chapterDataContext';
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
    <ChapterDataProvider>
      <NavigationContainer>
        <RootNavigator />
        {children}
      </NavigationContainer>
    </ChapterDataProvider>
  );
};

const RootNavigator = () => <MainDrawer />;
