import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { useDrawerNav } from '../../hooks/useNavigators';

import MyProfile from '../../screens/user/MyProfile';
import ContactUs from '../../screens/contact-us/ContactUs';
import PolicyAndCondition from '../../screens/PolicyAndCondition';

const DrawerNav = () => {
  const Drawer = useDrawerNav();

  return (
    <Drawer.Navigator>
      // Drawer // 1. my profile, 2. contact us 3. policy and condition
      <Drawer.Screen name={ScreenNames.MyProfile} component={MyProfile} />
      <Drawer.Screen name={ScreenNames.ContactUs} component={ContactUs} />
      <Drawer.Screen
        name={ScreenNames.PolicyAndCondition}
        component={PolicyAndCondition}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
