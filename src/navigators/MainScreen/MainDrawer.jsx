import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { useDrawerNav } from '../../hooks/useNavigators';
import { useMainDrawerScreenOptions } from '../../hooks/useNavigationScreenOptions';

import ContactUs from '../../screens/contact-us/ContactUs';
import PolicyAndCondition from '../../screens/PolicyAndCondition';
import MainStack from './MainStack';
import Login from '../../screens/auth/sign-in/Signin';

import { useStoreState } from 'easy-peasy';
import { selectIsLoggedIn } from '#store/selectors';

const MainDrawer = () => {
  const Drawer = useDrawerNav();
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
        name={ScreenNames.ContactUs}
        component={ContactUs}
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
          name={ScreenNames.Login}
          component={Login}
          options={() => ({
            title: '로그인',
          })}
        />
      )}
    </Drawer.Navigator>
  );
};

export default MainDrawer;
