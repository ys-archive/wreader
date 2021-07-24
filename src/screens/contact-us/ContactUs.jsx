import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { Loading } from '#components';
import { StyleSheet, Text } from '#components';
import { useNavigation } from '@react-navigation/native';
import { fetchAllContactUs } from '../../service/contact-us/fetchAllContactUs';
import ContactUsListItem from './ContactUsListItem';

const ContactUs = () => {
  const nav = useNavigation();
  // TODO: 실제 url 로 교체
  // TODO: GET - Get All Contact Us List 
  // const { data, isLoading, error, mutate } = fetchAllContactUs('DUMMY');

  // return <Loading style={s.loading} size="large" />;
  // if (isLoading) {
  // }

  // if (error) {
  //   return (
  //     <View>
  //       <Text>Error occurred!: {error}</Text>
  //     </View>
  //   );
  // }

  // if (!data) {
  //   return (
  //     <View>
  //       <Text> No Contact Us !</Text>
  //     </View>
  //   );
  // }
  // 문의 갯수, 각 contactUsItem (id, 답변 상태: pending | complete, date, contents)
  // const { contactUsItems } = data;

  const contactUsItems = [
    {
      id: '1',
      status: 'pending',
      date: '2021-01-01',
      contents: 'first contact us',
    },
    {
      id: '2',
      status: 'pending',
      date: '2021-01-12',
      contents: 'second contact us',
    },
    {
      id: '3',
      status: 'complete',
      date: '2021-02-03',
      contents: 'third contact us',
    },
    {
      id: '4',
      status: 'pending',
      date: '2021-04-11',
      contents: 'fourth contact us',
    },
    {
      id: '5',
      status: 'pending',
      date: '2021-11-20',
      contents: 'fifth contact us',
    },
    {
      id: '6',
      status: 'pending',
      date: '2021-01-01',
      contents: 'first contact us',
    },
    {
      id: '7',
      status: 'pending',
      date: '2021-01-12',
      contents: 'second contact us',
    },
    {
      id: '8',
      status: 'complete',
      date: '2021-02-03',
      contents: 'third contact us',
    },
    {
      id: '9',
      status: 'complete',
      date: '2021-04-11',
      contents: 'fourth contact us',
    },
    {
      id: '10',
      status: 'complete',
      date: '2021-11-20',
      contents: 'fifth contact us',
    },
  ];

  // TOOD: 문의하기 -> header Right

  return (
    <View style={s.root}>
      <Text isBold style={s.contactUsCount}>
        문의 {contactUsItems.length}&nbsp;건
      </Text>

      <View style={s.contactUsItemsView}>
        <FlatList
          data={contactUsItems}
          renderItem={item => <ContactUsListItem item={item.item} />}
        />
      </View>
    </View>
  );
};

export default ContactUs;

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
  contactUsCount: {
    fontSize: 20,
    margin: 15,
    // marginHorizontal: 15,
    // marginVertical: 25,
  },
  contactUsItemsView: {
    marginHorizontal: '5%',
  },
});
