import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';

import { Arrow } from '#components/icon';
import { colors } from '#constants';

import MyProfile from '../../screens/user/MyProfile';
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
        options={({ navigation }) => ({
          title: 'EDIT PROFILE',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'mont-heavy-demo',
            fontSize: 20,
            ...Platform.select({
              android: {
                marginLeft: 60,
              },
            }),
          },
          headerStyle: {
            backgroundColor: colors.light.ivory5,
            // borderBottomStartRadius: 23,
            // borderBottomEndRadius: 23,
          },
          headerLeft: () => (
            <Arrow
              onPress={() => navigation.goBack()}
              direction="left"
              iconStyle={{
                width: 20,
                height: 18,
                marginLeft: 25,
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MyProfileStack;
