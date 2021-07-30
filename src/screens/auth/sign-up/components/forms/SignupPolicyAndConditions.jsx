import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CheckBox, Button, StyleSheet, Text } from '#components';

const SignupPolicyAndConditions = ({
  onSubmit,
  values,
  setFieldValue,
  // onBlur,
  // errors,
  // touched,
}) => {
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
          // onChange={() => dispatch({ type: actionNames.toggleAllAllowed })}
          onChange={() => {
            const res = !isAllAllowed;
            setFieldValue('isAllAllowed', res);
            setFieldValue('isAgreementAllowed', res);
            setFieldValue('isPrivacyPolicyAllowed', res);
            setFieldValue('isMarketingAllowedOptional', res);
          }}
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>전체 동의</Text>
      </View>

      <View style={s.policyCheckBoxItem}>
        <CheckBox
          isChecked={isAgreementAllowed}
          onChange={() =>
            setFieldValue('isAgreementAllowed', !isAgreementAllowed)
          }
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>이용약관(필수)</Text>

        {/* TODO: 내용 열기 */}
        <Button style={s.policyDetailText} onPress={() => {}}>
          내용
        </Button>
      </View>

      <View style={s.policyCheckBoxItem}>
        <CheckBox
          isChecked={isPrivacyPolicyAllowed}
          onChange={() =>
            setFieldValue('isPrivacyPolicyAllowed', !isPrivacyPolicyAllowed)
          }
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>개인정보 취급방침(필수)</Text>
        {/* TODO: 내용 열기 */}
        <Button style={s.policyDetailText} onPress={() => {}}>
          내용
        </Button>
      </View>

      <View style={s.policyCheckBoxItem}>
        <CheckBox
          isChecked={isMarketingAllowedOptional}
          onChange={() =>
            setFieldValue(
              'isMarketingAllowedOptional',
              !isMarketingAllowedOptional,
            )
          }
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>마켓팅 이용 권한(선택)</Text>
        {/* TODO: 내용 열기 */}
        <Button style={s.policyDetailText} onPress={() => {}}>
          내용
        </Button>
      </View>

      <View>
        {/* TODO: 다음 구현 열기 */}
        <Button style={s.nextButton} onPress={onSubmit}>
          다음
        </Button>
      </View>
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
    marginVertical: 15,
  },
  nextButton: {
    marginTop: '15%',
    paddingHorizontal: '40%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
  policyDetailText: {
    position: 'absolute',
    right: '0%',
  },
  autoLoginText: {
    marginLeft: '5%',
  },
});
