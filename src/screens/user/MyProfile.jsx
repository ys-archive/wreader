import React, { useState } from 'react';
import { View, SafeAreaView, Image } from 'react-native';
// import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { StyleSheet, Text } from '#components';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

import {
  Cancel,
  Edit2,
  Person,
  Like,
  Instagram,
  Facebook,
} from '#components/icon';
import { colors } from '#constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useProfileImageLoader } from '#hooks';

import { useStoreState } from 'easy-peasy';
import { selectUserInfo } from '#store/selectors';

const MyProfile = () => {
  const nav = useNavigation();

  const onPressGoBackIcon = () => {
    nav.goBack();
  };

  const onPressEditIcon = () => {
    nav.navigate(ScreenNames.MyProfileEdit);
  };

  const userInfo = useStoreState(selectUserInfo);
  const { intro, facebook, instagram, nick } = userInfo;
  // const nick = userInfo !== null && userInfo.nick ? userInfo?.nick : 'SIGN IN';

  const [defaultUri, setDefaultUri] = useState('');

  // 프로필 이미지 로드
  useProfileImageLoader(setDefaultUri);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.placer}>
        <Cancel onPress={onPressGoBackIcon} style={{ zIndex: 50 }} />
        <Edit2 onPress={onPressEditIcon} style={{ zIndex: 50 }} />
        <View style={s.filler} />
        <View style={s.topSection}>
          {defaultUri ? (
            <Image
              style={{
                maxWidth: wp('55.6%'),
                maxHeight: 230,
                borderRadius: 200,
              }}
              source={{ uri: defaultUri }}
            />
          ) : (
            // <Person iconStyle={{ width: wp('55.6%'), height: 230, borderRadius: 50 }} />
            <View
              style={{
                width: wp('55.6%'),
                height: 230,
                borderRadius: 200,
                backgroundColor: '#000',
              }}
            />
          )}
        </View>

        <View style={s.userNamePlacer}>
          <Text isBold style={s.userName}>
            {nick}
          </Text>
        </View>

        <View style={s.socialSection}>
          <View style={[s.social, { marginLeft: 0 }]}>
            <Like
              style={{
                width: 19.4,
                height: 19.4,
                position: 'relative',
                top: 0,
                left: 0,
                tintColor: colors.light.ivory5,
              }}
              isPressable={false}
            />
            <Text style={s.socialText}>1500K</Text>
          </View>
          <View style={s.social}>
            <Instagram
              style={{
                width: 19.4,
                height: 19.4,
                position: 'relative',
                top: 0,
                left: 0,
                tintColor: colors.light.ivory5,
              }}
            />
            <Text style={s.socialText}>{instagram || 'NONE'}</Text>
          </View>
          <View style={s.social}>
            <Facebook
              style={{
                width: 19.4,
                height: 19.4,
                position: 'relative',
                top: 0,
                left: 0,
                tintColor: colors.light.ivory5,
              }}
            />
            <Text style={s.socialText}>{facebook || 'NONE'}</Text>
          </View>
        </View>

        <View style={s.introductionSection}>
          <Text style={s.introductionText}>
            {intro || 'NONE'}
            {/* Hello, I’m Jessica Momo It19 my hobbies to write some stories. Love
            to share my stories. */}
          </Text>
        </View>
      </View>
    </SafeAreaView>
    // <KeyboardAwareScrollView contentContainerStyle={s.root}>
    //   <MyProfileImage />
    //   <MyProfileAccountInfo />
    //   <MyProfileBasicInfo />
    // </KeyboardAwareScrollView>
  );
};

export default MyProfile;

const s = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.light.background,
  },
  placer: {
    flex: 1,
    height: '100%',
    marginHorizontal: '5.7%',
    ...Platform.select({
      android: {
        marginTop: '7%',
      },
    }),
  },
  filler: {
    minHeight: hp('18.5%'),
    maxHeight: hp('18.5%'),
  },
  topSection: {
    alignSelf: 'center',
    minHeight: hp('30%'),
  },
  userNamePlacer: {
    // position: 'absolute',
    // marginLeft: 11,
    // marginTop: hp('2.5%'),
    alignItems: 'center',
    // top: -30,
  },
  userName: {
    color: 'white',
    fontSize: 28,
  },
  socialSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginTop: 45.4,
    marginTop: hp('7%'),
  },
  social: {
    flexDirection: 'row',
    // marginLeft: 23.1,
  },
  socialText: {
    marginLeft: 6.8,
    fontSize: 21,
    color: colors.light.white,
  },
  introductionSection: {
    maxWidth: wp('76.1%'),
    alignSelf: 'center',
    marginTop: hp('6.4%'),
  },
  introductionText: {
    fontSize: 19,
    color: colors.light.white,
    textAlign: 'justify',
  },
});
