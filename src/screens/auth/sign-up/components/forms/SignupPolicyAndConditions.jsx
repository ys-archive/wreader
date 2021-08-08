import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
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
    <View>
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
          style={[{ width: 18, height: 10 }, s.policyArrow]}
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
          style={[{ width: 18, height: 10 }, s.policyArrow]}
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
          style={[{ width: 18, height: 10 }, s.policyArrow]}
        />
      </View>

      <Button
        isBold
        style={s.nextButton}
        textStyle={s.nextButtonText}
        onPress={onSubmit}
      >
        NEXT
        <Arrow direction="right" style={s.nextButtonArrow} />
      </Button>
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
    paddingTop: 35,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomStartRadius: 24,
    borderColor: colors.light.ivory5,
    alignItems: 'center',
  },
  nextButton: {
    marginTop: 48,
    // width: '120%',
    // paddingHorizontal: '40%',
    marginHorizontal: 0,
    paddingVertical: '4.5%',
    borderRadius: 11,
    backgroundColor: colors.light.ivory4,
  },
  nextButtonText: {
    color: colors.light.white,
    fontSize: 18,
  },
  nextButtonArrow: {
    width: 10,
    height: 23,
    position: 'absolute',
    right: -130,
    top: -17,
  },
  policyDetailText: {
    position: 'absolute',
    right: '0%',
  },
  autoLoginText: {
    fontSize: 18,
    marginLeft: '3%',
    color: colors.light.ivory5,
  },
  policyArrow: {
    position: 'absolute',
    right: 8,
    top: 20,
  },
});
