import React from 'react';
import { useStoreState } from 'easy-peasy';
import { selectIsLoggedIn } from '#store/selectors';

import * as ScreenNames from '../ScreenNames';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HeaderLeftGoBackHome from '../header/HeaderLeftGoBackHome';

import MainStack from '../level2/MainStack';
import ContactUsStack from '../level2/ContactUsStack';
import SigninStack from '../level2/SigninStack';
import PolicyAndConditionStack from '../level2/PolicyAndConditionStack';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  // const mainDrawerScreenOptions = useMainDrawerScreenOptions();
  const isLoggedIn = useStoreState(selectIsLoggedIn);

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.MainStack}
      drawerPosition="right"
      drawerStyle={{ width: 200 }}
      // screenOptions={{ ...mainDrawerScreenOptions }}
    >
      <Drawer.Screen
        name={ScreenNames.MainStack}
        component={MainStack}
        options={() => ({
          title: '홈',
          // drawerLabel: () => null,
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
        name={ScreenNames.PolicyAndConditionStack}
        component={PolicyAndConditionStack}
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
