import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useMainDrawerScreenOptions } from '../../hooks/useNavigationScreenOptions';

import MainStack from './MainStack';
import ContactUsStack from '../contact-us/ContactUsStack';
import PolicyAndCondition from '../../screens/PolicyAndCondition';
import SigninStack from '../auth/SigninStack';

import { useStoreState } from 'easy-peasy';
import { selectIsLoggedIn } from '#store/selectors';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const mainDrawerScreenOptions = useMainDrawerScreenOptions();
  const isLoggedIn = useStoreState(selectIsLoggedIn);

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.MainStack}
      drawerPosition="right"
      drawerStyle={{ width: 200 }}
      screenOptions={{ ...mainDrawerScreenOptions }}
    >
      <Drawer.Screen
        name={ScreenNames.MainStack}
        component={MainStack}
        options={() => ({
          // drawerLabel: () => null,
          title: '홈',
          // drawerIcon: () => null,
        })}
      />
      <Drawer.Screen
        name={ScreenNames.ContactUsStack}
        component={ContactUsStack}
        options={() => ({
          title: '문의하기',
        })}
      />
      <Drawer.Screen
        name={ScreenNames.PolicyAndCondition}
        component={PolicyAndCondition}
        options={() => ({
          title: '이용 약관',
        })}
      />
      {!isLoggedIn && (
        <Drawer.Screen
          name={ScreenNames.SigninStack}
          component={SigninStack}
          options={() => ({
            title: '로그인',
          })}
        />
      )}
    </Drawer.Navigator>
  );
};

export default MainDrawer;
