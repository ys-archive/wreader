import React from 'react';
import { useDrawerNav } from '../../hooks/useNavigators';

const DrawerNav = () => {
  const Drawer = useDrawerNav();

  return (
    <Drawer.Navigator>
      <Drawer.Screen /> // Drawer // 1. my profile, 2. contact us 3. policy and
      condition
    </Drawer.Navigator>
  );
};

export default DrawerNav;
