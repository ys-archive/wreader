import React from 'react';
import * as ScreenNames from '../names';
import { useStackNav } from '../../hooks/useNavigators';

import Main from '../../screens/Main';

const MainScreen = () => {
  const Stack = useStackNav();
  console.log(Stack);
  if (!Stack) return null;

  return (
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
  );
};

export default MainScreen;
