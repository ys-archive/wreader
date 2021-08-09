import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';

import PolicyAndCondition from '../../screens/policy-and-condition/PolicyAndCondition';
import GoBack from '../header/GoBack';
import { Arrow } from '#components/icon';
import { colors } from '#constants';

const Stack = createStackNavigator();

const PolicyAndConditionStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.PolicyAndCondition}>
      <Stack.Screen
        name={ScreenNames.PolicyAndCondition}
        component={PolicyAndCondition}
        options={({ navigation, route }) => ({
          title: 'TERMS OF USE',
          headerTitleStyle: {
            color: '#fff',
            fontWeight: 'bold',
            fontFamily: 'mont-heavy-demo',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: colors.light.ivory5,
            // borderBottomStartRadius: 23,
            // borderBottomEndRadius: 23,
          },
          headerLeft: () => (
            <Arrow
              onPress={() => navigation.goBack()}
              direction="left"
              iconStyle={{
                width: 20,
                height: 18,
                marginLeft: 25,
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default PolicyAndConditionStack;
