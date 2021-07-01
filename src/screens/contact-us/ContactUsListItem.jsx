import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';

const ContactUsListItem = ({ status, date, contents }) => {
  return (
    <View style={s.root}>
      <View style={s.row1}>
        <Text
          style={
            status === 'pending' ? s.statusTextPending : s.statusTextComplete
          }
        >
          {status}
        </Text>
        <Text style={s.dateText}>{date}</Text>
      </View>
      <View style={s.row2}>
        <Text>{contents}</Text>
      </View>
    </View>
  );
};

export default ContactUsListItem;

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row1: {
    flexDirection: 'row',
  },
  statusTextPending: {
    color: 'white',
    backgroundColor: 'navy',
    width: 70,
    height: 30,
  },
  statusTextComplete: {
    color: 'white',
    backgroundColor: 'grey',
    width: 70,
    height: 30,
  },
  dateText: {},
  row2: {
    flexDirection: 'row',
  },
});
