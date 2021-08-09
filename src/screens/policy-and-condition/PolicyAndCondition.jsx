import React from 'react';
import { View, ScrollView } from 'react-native';
import { StyleSheet, Text } from '#components';
import { colors } from '#constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Arrow } from '#components/icon';

const PolicyAndCondition = () => {
  return (
    <ScrollView style={s.scrollRoot}>
      <View style={s.root}>
        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('71.4%') },
          ]}
        >
          <Text isBold style={s.titleText}>
            TERMS OF USE
          </Text>

          <View style={s.descriptionSection}>
            <Text isBold style={[s.headerText]}>
              Composition of Terms
            </Text>

            <Text style={s.descriptionText}>
              This summary is designed to help you navigate our Terms of Service
              (“Terms”). We hope this information will be a useful guide, and be
              sure to read the full terms and conditions as well.
            </Text>

            <Text isBold style={[s.headerText]}>
              Welcome to YouTube
            </Text>

            <Text style={s.descriptionText}>
              This section describes the relationship between YouTube and its
              users. It includes a description of the service, defines the
              contract, and identifies the service provider.
            </Text>

            <Text isBold style={[s.headerText]}>
              Who can use the service
            </Text>

            <Text style={s.descriptionText}>
              This section describes specific requirements for use of the
              service and defines user classifications.
            </Text>

            <Text isBold style={[s.headerText]}>
              use of the service
            </Text>

            <Text style={s.descriptionText}>
              This section describes your rights to use the Service and the
              conditions that apply to your use of the Service. It also explains
              that the Services are subject to change.
            </Text>

            <Text isBold style={[s.headerText]}>
              Your Content and Operations
            </Text>

            <Text style={s.descriptionText}>
              This section applies to users who provide content to the service.
              It defines the scope of the rights granted by uploading content
              and includes user consent not to upload content that infringes on
              the rights of others.
            </Text>

            <Text isBold style={[s.headerText]}>
              Account Suspension and Termination
            </Text>

            <Text style={s.descriptionText}>
              This section explains how you and YouTube can end a relationship.
            </Text>

            <Text isBold style={[s.headerText]}>
              About the software included in the service
            </Text>

            <Text style={s.descriptionText}>
              In this section you can find details about the software in the
              service.
            </Text>

            <Text isBold style={[s.headerText]}>
              Other legal provisions
            </Text>

            <Text style={s.descriptionText}>
              This section describes the legal obligations of the parties. You
              can also find an explanation of what YouTube is not responsible
              for.
            </Text>

            <Text isBold style={[s.headerText]}>
              About this Agreement
            </Text>

            <Text style={[s.descriptionText, { marginBottom: 3 }]}>
              In this section, you can find important details related to the
              contract, such as changes to the terms and the applicable law.
            </Text>
            <Arrow
              direction="up"
              iconStyle={{ width: 16, height: 10 }}
              style={{ position: 'absolute', right: '5.1%', bottom: -10 }}
            />
          </View>
        </View>
        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('4.7%') },
          ]}
        >
          <Text isBold style={[s.titleText]}>
            PRIVACY POLICY
          </Text>
          <Arrow
            direction="down"
            iconStyle={{ width: 16, height: 10 }}
            style={{ position: 'absolute', right: '5.1%', bottom: 17 }}
          />
        </View>
        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('4.7%') },
          ]}
        >
          <Text isBold style={[s.titleText]}>
            MARKETING
          </Text>
          <Arrow
            direction="down"
            iconStyle={{ width: 16, height: 10 }}
            style={{ position: 'absolute', right: '5.1%', bottom: 17 }}
          />
        </View>
        <View style={s.copyright}>
          <Text style={s.copyrightText}>{'\u00A9'}&nbsp;</Text>
          <Text style={s.copyrightText}>
            2021 W.READER. ALL rights reserved.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PolicyAndCondition;

const s = StyleSheet.create({
  scrollRoot: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  root: {
    paddingHorizontal: 27.3,
    backgroundColor: colors.light.background,
    flex: 1,
    // minHeight: '100%',
  },
  titleSection: {
    marginTop: 28.2,
    paddingLeft: 8.6,
    height: hp('7.9%'),
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomStartRadius: 17,
    borderColor: colors.light.ivory5,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 25,
    marginBottom: 10,
    color: colors.light.ivory5,
    marginTop: 12.7,
  },
  descriptionSection: {
    marginLeft: 15.9,
    marginBottom: 28.3,
  },
  headerText: {
    color: colors.light.ivory5,

    marginVertical: 15,
  },
  descriptionText: {
    color: colors.light.white,
    fontSize: 13,
  },
  copyright: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 30,
    justifyContent: 'center',
  },
  copyrightText: {
    fontSize: 10,
  },
});
