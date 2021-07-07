import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from '#components';

import GoBack from '../header/GoBack';

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
          title: '문의내역',
          headerLeft: () => <GoBack navigation={navigation} />,
          headerRight: () => (
            <Button
              onPress={() => navigation?.navigate(ScreenNames.ContactUsDetail)}
            >
              문의하기
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name={ScreenNames.ContactUsDetail}
        component={ContactUsDetail}
        options={({ navigation, route }) => ({
          title: '문의하기',
          headerLeft: () => <GoBack navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default ContactUsStack;
