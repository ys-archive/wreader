import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../screens/Main';
import { AntDesign } from '@expo/vector-icons';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { selectIsLoggedIn } from '#store/selectors';
import { RequireLoginAlert } from '#components/alert';

const Stack = createStackNavigator();

const MainStack = () => {
  const isLoggedIn = useStoreState(selectIsLoggedIn);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Main}
        component={Main}
        options={({ navigation, route }) => ({
          title: null,
          headerLeft: () => (
            <AntDesign
              name="home"
              size={24}
              color="black"
              style={{ marginLeft: 24 }}
              onPress={() => navigation.navigate(ScreenNames.MainStack)}
            />
          ),
          headerRight: () => (
            <AntDesign
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 24 }}
              onPress={() =>
                isLoggedIn
                  ? navigation.navigate(ScreenNames.MyProfileStack)
                  : RequireLoginAlert()
              }
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
