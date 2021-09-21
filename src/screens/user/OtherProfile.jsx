import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image } from 'react-native';
import { StyleSheet, Text } from '#components';
import { Cancel, Like, Instagram, Facebook } from '#components/icon';
import { colors } from '#constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import UserService from '../../services/UserService';

const OtherProfile = ({ route }) => {
  const nav = useNavigation();
  const { userId } = route.params;

  const [data, setData] = useState(null);

  useEffect(() => {
    (async function fetchOtherUserProfile() {
      const { data } = await UserService.GET_getUserInfo(userId);
      if (data) setData(data);
    })();
  }, [userId]);

  if (!data || !data.item) return null;

  const {
    nick,
    instagram,
    facebook,
    intro,
    img: { path },
  } = data.item;

  console.log(data.item);
  // console.log(path);

  const onPressGoBackIcon = () => nav.goBack();

  return (
    <SafeAreaView style={s.root}>
      <View style={s.placer}>
        <Cancel onPress={onPressGoBackIcon} style={{ zIndex: 50 }} />

        <View style={s.filler} />

        <View style={s.topSection}>
          {path ? (
            <Image
              style={{
                width: wp('55.6%'),
                height: 230,
                borderRadius: 200,
              }}
              source={{ uri: path }}
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
          <Text style={s.introductionText}>{intro || 'NONE'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtherProfile;

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
