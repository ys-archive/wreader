import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { useDrawerNav } from '../../hooks/useNavigators';

import MyProfile from '../../screens/user/MyProfile';
import ContactUsList from '../../screens/contact-us/ContactUsList';
import PolicyAndCondition from '../../screens/PolicyAndCondition';

const DrawerNav = () => {
  const Drawer = useDrawerNav();

  return (
    <Drawer.Navigator>
      // Drawer // 1. my profile, 2. contact us 3. policy and condition
      <Drawer.Screen name={ScreenNames.MyProfile} component={MyProfile} />
      <Drawer.Screen
        name={ScreenNames.ContactUsDetail}
        component={ContactUsList}
      />
      <Drawer.Screen
        name={ScreenNames.PolicyAndCondition}
        component={PolicyAndCondition}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
