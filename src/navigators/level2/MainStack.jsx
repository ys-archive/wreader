import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../screens/Main';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Main}
        component={Main}
        options={{
          headerShown: false,
          layout: {
            // backgroundColor: 'transparent',
            // componentBackgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: false,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
