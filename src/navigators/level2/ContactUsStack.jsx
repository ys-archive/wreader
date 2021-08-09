import React from 'react';
import { Platform } from 'react-native';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from '#components';

import GoBack from '../header/GoBack';
import { Arrow } from '#components/icon';
import { colors } from '#constants';

import ContactUs from '../../screens/contact-us/ContactUs';
import ContactUsDetail from '../../screens/contact-us/ContactUsDetail';

const Stack = createStackNavigator();

const ContactUsStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.ContactUs}>
      <Stack.Screen
        name={ScreenNames.ContactUs}
        component={ContactUs}
        options={({ navigation, route }) => ({
          title: 'SUPPORT',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'mont-heavy-demo',
            fontSize: 20,
            ...Platform.select({
              android: {
                marginLeft: 85,
              },
            }),
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
      <Stack.Screen
        name={ScreenNames.ContactUsDetail}
        component={ContactUsDetail}
        options={({ navigation, route }) => ({
          title: 'SUPPORT',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'mont-heavy-demo',
            fontSize: 20,
            ...Platform.select({
              android: {
                marginLeft: 85,
              },
            }),
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

export default ContactUsStack;
