import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox, Button } from '#components';
import { actionNames, usePolicyReducer } from '../hooks/usePolicyReducer';

const SignupPolicyAndConditions = () => {
  const [state, dispatch] = usePolicyReducer();
  const {
    isAllAllowed,
    isAgreementAllowed,
    isPrivacyPolicyAllowed,
    isMarketingAllowedOptional,
  } = state;

  return (
    <View>
      <View style={s.policyCheckBoxItem}>
        <CheckBox
          isChecked={isAllAllowed}
          onChange={() => dispatch({ type: actionNames.toggleAllAllowed })}
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>전체 동의</Text>
      </View>

      <View style={s.policyCheckBoxItem}>
        <CheckBox
          isChecked={isAgreementAllowed}
          onChange={() =>
            dispatch({ type: actionNames.toggleAgreementAllowed })
          }
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>이용약관(필수)</Text>
        {/* TODO: 내용 열기 */}
        <Button style={s.policyDetailText}>내용</Button>
      </View>

      <View style={s.policyCheckBoxItem}>
        <CheckBox
          isChecked={isPrivacyPolicyAllowed}
          onChange={() =>
            dispatch({ type: actionNames.togglePrivacyPolicyAllowed })
          }
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>개인정보 취급방침(필수)</Text>
        {/* TODO: 내용 열기 */}
        <Button style={s.policyDetailText}>내용</Button>
      </View>

      <View style={s.policyCheckBoxItem}>
        <CheckBox
          isChecked={isMarketingAllowedOptional}
          onChange={() =>
            dispatch({
              type: actionNames.toggleMarketingAllowedOptional,
            })
          }
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>마켓팅 이용 권한(선택)</Text>
        {/* TODO: 내용 열기 */}
        <Button style={s.policyDetailText}>내용</Button>
      </View>

      <View>
        {/* TODO: 다음 구현 열기 */}
        <Button style={s.nextButton}>다음</Button>
      </View>
    </View>
  );
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
    // top: '77%',
  },
});
