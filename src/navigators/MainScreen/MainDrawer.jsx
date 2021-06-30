import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { useDrawerNav } from '../../hooks/useNavigators';

import ContactUs from '../../screens/contact-us/ContactUs';
import PolicyAndCondition from '../../screens/PolicyAndCondition';
import MainStack from './MainStack';

const MainDrawer = () => {
  const Drawer = useDrawerNav();

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.MainStack}
      drawerPosition="right"
      drawerStyle={{ width: 200 }}
      // screenOptions={{ drawerPosition: 'right' }}
    >
      <Drawer.Screen
        name={ScreenNames.ContactUs}
        component={ContactUs}
        options={() => ({
          title: 'Contact us',
        })}
      />
      <Drawer.Screen
        name={ScreenNames.PolicyAndCondition}
        component={PolicyAndCondition}
        options={() => ({
          title: 'Policy & Condition',
        })}
      />
      <Drawer.Screen
        name={ScreenNames.MainStack}
        component={MainStack}
        options={() => ({
          // drawerLabel: () => null,
          title: 'Main',
          // drawerIcon: () => null,
        })}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
