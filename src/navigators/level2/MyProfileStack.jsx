import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';

import GoBack from '../header/GoBack';

import MyProfile from '../../screens/user/MyProfile/MyProfile';

const Stack = createStackNavigator();

const MyProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.MyProfile}>
      <Stack.Screen
        name={ScreenNames.MyProfile}
        component={MyProfile}
        options={({ navigation, route }) => ({
          title: '프로필 관리',
          headerLeft: () => <GoBack navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default MyProfileStack;
