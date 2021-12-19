import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StyleSheet, Text } from '#components';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

import { Cancel } from '#components/icon';
import { colors } from '#constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SignupPolicyTexts = ({
  title,
  subtitle,
  subtitleDetail1,
  subtitleDetail2,
  subtitleDetail3,
  basicInfo,
}) => {
  const nav = useNavigation();

  const onPressGoBackIcon = () => {
    nav.navigate(ScreenNames.Signin);
  };

  return (
    <SafeAreaView>
      <View style={s.root}>
        <Cancel onPress={onPressGoBackIcon} />
        <View style={s.topSection}>
          <Text fontFamily="regular" style={s.titleText}>
            {title}
          </Text>
        </View>

        <View style={[s.titleSection, { width: wp('84.7%') }]}>
          <Text fontFamily="regular" style={s.subtitleText}>
            {subtitle}
          </Text>
          <View style={s.subtitleDetailsView}>
            <Text style={s.subtitleDetailText}>{subtitleDetail1}</Text>
            <Text style={s.subtitleDetailText}>{subtitleDetail2}</Text>
            {subtitleDetail3 && (
              <Text style={s.subtitleDetailText}>{subtitleDetail3}</Text>
            )}
          </View>
        </View>

        {basicInfo && (
          <View style={s.basicInfoSection}>
            <Text fontFamily="regular" style={s.basicInfo}>
              {basicInfo}
            </Text>
          </View>
        )}
        {basicInfo && <View style={s.separator} />}
      </View>
    </SafeAreaView>
  );
};

export default SignupPolicyTexts;

const s = StyleSheet.create({
  root: {
    // width: '100%',
    height: hp('100%'),
    // alignItems: 'center',
  },
  topSection: {
    flexDirection: 'row',
    marginTop: hp('3.1%'),
    alignSelf: 'center',
  },
  titleSection: {
    marginTop: 19.1,
    height: hp('7.9%'),
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomStartRadius: 17,
    borderColor: colors.light.ivory5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 21,
    color: colors.light.ivory5,
    lineHeight: 28,
    letterSpacing: 0,
  },
  subtitleDetailsView: {
    marginVertical: 11,
  },
  subtitleText: {
    fontSize: 13,
    textAlign: 'center',
    color: colors.light.ivory5,
  },
  subtitleDetailText: {
    marginTop: 5.7,
    width: 178,
    height: 23,
    fontSize: 11,
    letterSpacing: -0.7,
    textAlign: 'center',
    color: colors.light.ivory5,
  },
  basicInfoSection: {},
  basicInfo: {
    marginTop: hp('3.7%'),
    width: 69,
    height: 17,
    fontSize: 15,
    textAlign: 'left',
    color: '#a39b88',
  },
  separator: {
    marginTop: 2.5,
    maxWidth: wp('35.7%'),
    // width: 1000,
    minHeight: 1,
    backgroundColor: colors.light.ivory5,
    marginBottom: 15,
  },
});
