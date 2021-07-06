import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from '#components';

import HeaderLeftGoBackHome from '../header/HeaderLeftGoBackHome';

import MyProfile from '../../screens/user/MyProfile/MyProfile';

const Stack = createStackNavigator();

const UserInfoStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.MyProfile}>
      <Stack.Screen
        name={ScreenNames.MyProfile}
        component={MyProfile}
        options={({ navigation, route }) => ({
          //   title: '',
          headerLeft: () => <HeaderLeftGoBackHome navigation={navigation} />,
          //   headerRight: () => (
          //     <Button
          //       onPress={() => navigation?.navigate(ScreenNames.ContactUsDetail)}
          //     >
          //       문의하기
          //     </Button>
          //   ),
        })}
      />
      {/* <Stack.Screen
        name={ScreenNames.ContactUsDetail}
        component={ContactUsDetail}
        options={({ navigation, route }) => ({
          //   title: '문의하기',
          headerLeft: () => <HeaderLeftGoBackHome navigation={navigation} />,
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default UserInfoStack;
