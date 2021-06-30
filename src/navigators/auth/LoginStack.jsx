import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';
import { useMainDrawerScreenOptions } from '../../hooks/useNavigationScreenOptions';

import Signin from '../../screens/auth/sign-in/Signin';
import Signup from '../../screens/auth/sign-up/Signup';
import Signup2 from '../../screens/auth/sign-up2/Signup2';

import { useStoreState } from 'easy-peasy';
import { selectIsLoggedIn } from '#store/selectors';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenNames.Login} component={Signin} />
      <Stack.Screen name={ScreenNames.Signup} component={Signup} />
      <Stack.Screen name={ScreenNames.Signup2} component={Signup2} />
    </Stack.Navigator>
  );
};

export default LoginStack;
