import React from 'react';
import { useStoreState } from 'easy-peasy';
import { selAuth } from '../../store/selectors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as ScreenNames from '../ScreenNames';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerTop from './DrawerTop';

import MainStack from '../level2/MainStack';
import ContactUsStack from '../level2/ContactUsStack';
import SigninStack from '../level2/SigninStack';
import PolicyAndConditionStack from '../level2/PolicyAndConditionStack';
import MyProfileStack from '../level2/MyProfileStack';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.MainStack}
      drawerPosition="right"
      drawerStyle={{ width: wp('83.3%') }}
      drawerContent={props => <DrawerTop {...props} />}
    >
      <Drawer.Screen
        name={ScreenNames.MyProfileStack}
        component={MyProfileStack}
      />

      <Drawer.Screen name={ScreenNames.MainStack} component={MainStack} />

      <Drawer.Screen
        name={ScreenNames.ContactUsStack}
        component={ContactUsStack}
      />

      <Drawer.Screen
        name={ScreenNames.PolicyAndConditionStack}
        component={PolicyAndConditionStack}
      />

      {!isLoggedIn && (
        <Drawer.Screen name={ScreenNames.SigninStack} component={SigninStack} />
      )}
    </Drawer.Navigator>
  );
};

export default MainDrawer;
