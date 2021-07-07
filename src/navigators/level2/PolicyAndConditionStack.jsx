import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';

import PolicyAndCondition from '../../screens/PolicyAndCondition';
import GoBack from '../header/GoBack';

const Stack = createStackNavigator();

const PolicyAndConditionStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.PolicyAndCondition}>
      <Stack.Screen
        name={ScreenNames.PolicyAndCondition}
        component={PolicyAndCondition}
        options={({ navigation, route }) => ({
          title: '이용약관',
          headerLeft: () => <GoBack navigation={navigation} direction="left" />,
        })}
      />
    </Stack.Navigator>
  );
};

export default PolicyAndConditionStack;
