import React from 'react';
import { useStackNav } from '../../hooks/useNavigators';
import { createStackNavigator } from '@react-navigation/stack';

import * as ScreenNames from '../names';

import MainScreen from './MainScreen';
import DrawerNav from '../drawer/DrawerNav';
import Main from '../../screens/Main';

const InnerStack = createStackNavigator();

const StackNav = () => {
  const Stack = useStackNav();
  return (
    <Stack.Navigator initialRouteName={ScreenNames.Main}>
      <Stack.Screen
        name={ScreenNames.Main}
        component={Main}
        // options={{
        //   // headerTitle: props => <LogoTitle {...props} />,
        //   // headerRight: () => (
        //   //   <Button
        //   //     onPress={() => alert('This is a button!')}
        //   //     title="Info"
        //   //     color="#fff"
        //   //   />
        //   // ),
        //   headerLeft: () => {
        //     // TODO; GoToHome Icon
        //     return null;
        //   },
        //   headerRight: () => {
        //     // TODO: Open Drawer
        //     return null;
        //   },
        // }}
      />
      <Stack.Screen name="drawer" component={DrawerNav} />
      {/* <InnerStack.Navigator></InnerStack.Navigator> */}
    </Stack.Navigator>
  );
};

export default StackNav;
