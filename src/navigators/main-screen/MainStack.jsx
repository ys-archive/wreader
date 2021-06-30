import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';
import { useMainStackScreenOptions } from '../../hooks/useNavigationScreenOptions';

import Main from '../../screens/Main';

const Stack = createStackNavigator();

const MainStack = () => {
  const mainStackScreenOptions = useMainStackScreenOptions();

  return (
    <Stack.Navigator screenOptions={{ ...mainStackScreenOptions }}>
      <Stack.Screen name={ScreenNames.Main} component={Main} />
    </Stack.Navigator>
  );
};

export default MainStack;
