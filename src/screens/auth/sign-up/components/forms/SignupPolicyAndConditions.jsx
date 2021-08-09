import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { CheckBox, Button, StyleSheet, Text } from '#components';
import { colors } from '#constants';
import { Arrow } from '#components/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SignupPolicyAndConditions = ({ onSubmit, values, setFieldValue }) => {
  const {
    isAllAllowed,
    isAgreementAllowed,
    isPrivacyPolicyAllowed,
    isMarketingAllowedOptional,
  } = values;

  return (
    <View style={s.root}>
      <View style={s.policyCheckBoxItem}>
        <CheckBox
          isChecked={isAllAllowed}
          onChange={() => {
            const res = !isAllAllowed;
            setFieldValue('isAllAllowed', res);
            setFieldValue('isAgreementAllowed', res);
            setFieldValue('isPrivacyPolicyAllowed', res);
            setFieldValue('isMarketingAllowedOptional', res);
          }}
          borderColor={colors.light.ivory5}
          highlightColor={colors.light.transparent}
          checkColor={colors.light.ivory5}
        />
        <Text style={s.autoLoginText} isBold>
          AGREE TO ALL TERMS
        </Text>
      </View>

      <View style={s.policyCheckBoxItemOutline}>
        <CheckBox
          isChecked={isAgreementAllowed}
          onChange={() =>
            setFieldValue('isAgreementAllowed', !isAgreementAllowed)
          }
          borderColor={colors.light.ivory5}
          highlightColor={colors.light.transparent}
          checkColor={colors.light.ivory5}
        />
        <Text isBold style={s.autoLoginText}>
          TERMS OF USE
        </Text>

        {/* TODO: 내용 열기 */}
        <Arrow
          direction="down"
          style={s.policyArrow}
          iconStyle={{ width: 18, height: 10 }}
        />
      </View>

      <View style={s.policyCheckBoxItemOutline}>
        <CheckBox
          isChecked={isPrivacyPolicyAllowed}
          onChange={() =>
            setFieldValue('isPrivacyPolicyAllowed', !isPrivacyPolicyAllowed)
          }
          borderColor={colors.light.ivory5}
          highlightColor={colors.light.transparent}
          checkColor={colors.light.ivory5}
        />
        <Text isBold style={s.autoLoginText}>
          PRIVACY POLICY
        </Text>

        {/* TODO: 내용 열기 */}
        <Arrow
          direction="down"
          style={s.policyArrow}
          iconStyle={{ width: 18, height: 10 }}
        />
      </View>

      <View style={s.policyCheckBoxItemOutline}>
        <CheckBox
          isChecked={isMarketingAllowedOptional}
          onChange={() =>
            setFieldValue(
              'isMarketingAllowedOptional',
              !isMarketingAllowedOptional,
            )
          }
          borderColor={colors.light.ivory5}
          highlightColor={colors.light.transparent}
          checkColor={colors.light.ivory5}
        />
        <Text isBold style={s.autoLoginText}>
          MARKETING
        </Text>

        {/* TODO: 내용 열기 */}
        <Arrow
          direction="down"
          style={s.policyArrow}
          iconStyle={{ width: 18, height: 10 }}
        />
      </View>

      <Button
        isBold
        style={s.nextButton}
        textStyle={s.nextButtonText}
        onPress={onSubmit}
      >
        NEXT
      </Button>
      <Arrow
        direction="right"
        style={{ position: 'absolute', right: 10, bottom: 60 }}
        iconStyle={{ width: 10, height: 20, tintColor: 'white' }}
      />
    </View>
  );
};

SignupPolicyAndConditions.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

SignupPolicyAndConditions.defaultProps = {
  //
};

export default SignupPolicyAndConditions;

const s = StyleSheet.create({
  root: {
    // marginTop: 20,
  },
  policyCheckBoxItem: {
    flexDirection: 'row',
    // marginVertical: 15,
    marginHorizontal: 10,
    paddingLeft: 15,
    // paddingBottom: 15,
  },
  policyCheckBoxItemOutline: {
    flexDirection: 'row',
    marginHorizontal: 0,
    paddingLeft: 25,
    paddingBottom: 15,
    paddingTop: 25,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomStartRadius: 24,
    borderColor: colors.light.ivory5,
    alignItems: 'center',
  },
  nextButton: {
    marginTop: 48,
    marginBottom: 48,
    // width: '120%',
    // paddingHorizontal: '40%',
    marginHorizontal: 0,
    paddingVertical: '3.5%',
    borderRadius: 11,
    backgroundColor: colors.light.ivory5,
  },
  nextButtonText: {
    color: colors.light.white,
    fontSize: 18,
  },
  nextButtonArrow: {
    position: 'absolute',
    right: -100,
    top: 0,
  },
  policyDetailText: {
    position: 'absolute',
    right: '0%',
  },
  autoLoginText: {
    fontSize: 13,
    marginLeft: '3%',
    color: colors.light.ivory5,
  },
  policyArrow: {
    position: 'absolute',
    right: 8,
    bottom: 20,
  },
});
