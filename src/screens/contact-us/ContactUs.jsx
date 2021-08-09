import React from 'react';
import { View, TouchableOpacity } from 'react-native';
// import { Loading } from '#components';
import { StyleSheet, Text } from '#components';
import { colors } from '#constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import { LogoCircle, Arrow, Plus } from '#components/icon';

import * as ScreenNames from '#navigators/ScreenNames';

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

  const moveToContactUsDetail = () => {
    nav.navigate(ScreenNames.ContactUsDetail);
  };

  return (
    <View style={s.root}>
      <View style={s.placer}>
        <Text isBold style={s.title}>
          INQUARIES
        </Text>

        <View style={s.separator} />

        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('6.2%') },
          ]}
        >
          <Text isBold style={s.subtitle}>
            How to invite friends?
          </Text>
          <Arrow
            direction="down"
            iconStyle={{ width: 14, height: 8 }}
            style={{ position: 'absolute', bottom: 15, right: 10 }}
          />
        </View>

        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('10.2%') },
          ]}
        >
          <View style={s.selectedTopView}>
            <Text isBold style={s.selectedSubtitle}>
              How to invite friends?
            </Text>

            <Text style={s.selectedDate}>2021.07.28</Text>
          </View>

          <Text style={s.selectedDetail}>
            I wanna write down a science fiction story. Then, What kind of
            category is the right part of it?
          </Text>

          <View style={s.selectedBottomView}>
            <LogoCircle style={s.logo} />
            <Text style={s.logoDetail}>
              Hello, Let us help you. If you want to write about it please
              choose the fantasy category
            </Text>
          </View>
          <Arrow
            direction="up"
            iconStyle={{ width: 14, height: 8 }}
            style={{ position: 'absolute', bottom: 15, right: 10 }}
          />
        </View>

        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('6.2%') },
          ]}
        >
          <Text isBold style={s.subtitle}>
            How to invite friends?
          </Text>
          <Arrow
            direction="down"
            iconStyle={{ width: 14, height: 8 }}
            style={{ position: 'absolute', bottom: 15, right: 10 }}
          />
        </View>

        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('6.2%') },
          ]}
        >
          <Text isBold style={s.subtitle}>
            How to invite friends?
          </Text>
          <Arrow
            direction="down"
            iconStyle={{ width: 14, height: 8 }}
            style={{ position: 'absolute', bottom: 15, right: 10 }}
          />
        </View>

        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('6.2%') },
          ]}
        >
          <Text isBold style={s.subtitle}>
            How to invite friends?
          </Text>
          <Arrow
            direction="down"
            iconStyle={{ width: 14, height: 8 }}
            style={{ position: 'absolute', bottom: 15, right: 10 }}
          />
        </View>

        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('6.2%') },
          ]}
        >
          <Text isBold style={s.subtitle}>
            How to invite friends?
          </Text>
          <Arrow
            direction="down"
            iconStyle={{ width: 14, height: 8 }}
            style={{ position: 'absolute', bottom: 15, right: 10 }}
          />
        </View>

        <View style={s.seeMoreSection}>
          <Plus />
          <Text isBold style={s.seeMore}>
            SEE MORE
          </Text>
        </View>

        <Text isBold style={s.title}>
          CONTACT US
        </Text>

        <View style={s.separator2} />

        <TouchableOpacity onPress={moveToContactUsDetail}>
          <View
            style={[
              s.titleSection,
              { width: wp('84.7%'), minHeight: hp('6.2%') },
            ]}
          >
            <Text isBold style={s.subtitle}>
              TELL US MORE
            </Text>
            <Arrow
              direction="right"
              iconStyle={{
                width: 8,
                height: 14,
                tintColor: colors.light.ivory4,
              }}
              style={{ position: 'absolute', bottom: 13, right: 10 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactUs;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  placer: {
    marginHorizontal: '8.3%',
  },
  title: {
    marginTop: 45.6,
    fontSize: 21,
    color: '#fff',
  },
  separator: {
    maxWidth: '50%',
    minHeight: 1,
    backgroundColor: colors.light.ivory5,
    marginTop: '2%',
    marginBottom: '10.8%',
  },
  separator2: {
    maxWidth: '50%',
    minHeight: 1,
    backgroundColor: colors.light.ivory5,
    marginTop: '2%',
    marginBottom: 15.2,
  },
  subtitle: {
    color: colors.light.ivory5,
    marginLeft: '2.8%',
    marginBottom: 10.4,
    fontSize: 17,
  },
  selectedTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  selectedSubtitle: {
    color: '#fff',
    marginLeft: '2.8%',
    marginBottom: 10.4,
    fontSize: 17,
  },
  selectedDate: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 10.4,
  },
  selectedDetail: {
    color: '#fff',
    marginLeft: '2.8%',
    fontSize: 11.5,
    marginRight: '18.4%',
  },
  logo: {
    marginLeft: '2.8%',
    marginRight: 8.9,
  },
  logoDetail: {
    fontSize: 10,
    maxWidth: 200,
    maxHeight: 30,
    color: colors.light.ivory4,
  },
  selectedBottomView: {
    flexDirection: 'row',
    marginTop: 13.9,
    marginBottom: 13.4,
  },
  titleSection: {
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomStartRadius: 17,
    borderColor: colors.light.ivory5,
    justifyContent: 'flex-end',
  },
  seeMoreSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15.2,
  },
  seeMore: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 5.9,
  },
});
