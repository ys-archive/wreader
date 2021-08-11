import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';

import GoBack from '../header/GoBack';

import MyProfile from '../../screens/user/MyProfile/MyProfile';
import MyProfileEdit from '../../screens/user/MyProfileEdit/MyProfileEdit';

const Stack = createStackNavigator();

const MyProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.MyProfile}>
      <Stack.Screen
        name={ScreenNames.MyProfile}
        component={MyProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.MyProfileEdit}
        component={MyProfileEdit}
        options={({ navigation, route }) => ({
          title: null,
          headerLeft: () => <GoBack navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default MyProfileStack;
