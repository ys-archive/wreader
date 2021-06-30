import React from 'react';
import * as ScreenNames from '../../ScreenNames';
import { useDrawerNav } from '../../../hooks/useNavigators';

import ContactUs from '../../../screens/contact-us/ContactUs';
import PolicyAndCondition from '../../../screens/PolicyAndCondition';
import MainStack from './MainStack';

const MainDrawer = () => {
  const Drawer = useDrawerNav();
  // const Stack = useRootStackNav();

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.MainStack}
      drawerPosition="right"
      drawerStyle={{ width: 200 }}
      // screenOptions={{ drawerPosition: 'right' }}
    >
      <Drawer.Screen name={ScreenNames.ContactUs} component={ContactUs} />
      <Drawer.Screen
        name={ScreenNames.PolicyAndCondition}
        component={PolicyAndCondition}
      />
      <Drawer.Screen name={ScreenNames.MainStack} component={MainStack} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
