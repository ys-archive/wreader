import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';

import GoToSignin from '../header/GoToSignin';

import Signin from '../../screens/auth/sign-in/Signin';
import Signup from '../../screens/auth/sign-up/Signup';
import Signup2 from '../../screens/auth/sign-up2/Signup2';
import FindPassword from '../../screens/auth/find-password/FindPassword';
import ChangePassword from '../../screens/auth/change-password/ChangePassword';

const Stack = createStackNavigator();

const SigninStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.Signin}>
      <Stack.Screen
        name={ScreenNames.Signin}
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Signup}
        component={Signup}
        options={({ navigation }) => ({
          headerShown: false,
          // title: () => null,
          // headerLeft: () => null,
          // headerRight: () => <GoToSignin navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={ScreenNames.Signup2}
        component={Signup2}
        options={({ navigation }) => ({
          headerShown: false,
          // title: () => null,
          // headerLeft: () => null,
          // headerRight: () => <GoToSignin navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={ScreenNames.FindPassword}
        component={FindPassword}
        options={({ navigation }) => ({
          headerShown: false,
          // title: () => null,
          // headerLeft: () => null,
          // headerRight: () => <GoToSignin navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={ScreenNames.ChangePassword}
        component={ChangePassword}
        options={({ navigation }) => ({
          headerShown: false,
          // title: () => null,
          // headerLeft: () => null,
          // headerRight: () => <GoToSignin navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default SigninStack;
