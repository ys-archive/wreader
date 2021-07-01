import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StyleSheet, Text } from '#components';

const ContactUsListItem = ({ item: { status, date, contents } }) => {
  return (
    <SafeAreaView style={s.root}>
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
        <Text style={s.contentsText}>{contents}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ContactUsListItem;

const s = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  row1: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  statusTextPending: {
    color: 'white',
    backgroundColor: 'navy',
    // width: 70,
    // height: 30,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  statusTextComplete: {
    color: 'white',
    backgroundColor: 'grey',
    // width: 70,
    // height: 30,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  dateText: {
    marginLeft: 10,
  },
  row2: {
    flexDirection: 'row',
  },
  contentsText: {
    fontSize: 18,
  },
});
