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
  const { data, isLoading, error, mutate } = fetchAllContactUs('DUMMY');

  if (isLoading) {
    return <Loading style={s.loading} size="large" />;
  }

  if (error) {
    return (
      <View>
        <Text>Error occurred!: {error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text> No Contact Us !</Text>
      </View>
    );
  }

  // 문의 갯수, 각 ContactUsDetail (id, 답변 상태: pending | complete, date, contents)
  const { contactUsDetails } = data;

  // TOOD: 문의하기 -> header Right

  return (
    <SafeAreaView style={s.root}>
      <Text>문의 {contactUsDetails.length}&nbsp;건 </Text>

      <View>
        <FlatList
          data={contactUsDetails}
          renderItem={item => <ContactUsListItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
