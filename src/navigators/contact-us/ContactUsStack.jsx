import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';

import ContactUs from '../../screens/contact-us/ContactUs';
import ContactUsDetail from '../../screens/contact-us/ContactUsDetail';

const Stack = createStackNavigator();

const ContactUsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenNames.ContactUs} component={ContactUs} />
      <Stack.Screen
        name={ScreenNames.ContactUsDetail}
        component={ContactUsDetail}
      />
    </Stack.Navigator>
  );
};

export default ContactUsStack;
