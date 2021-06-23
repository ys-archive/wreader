import React from 'react';
import { View } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  StyleSheet,
  Text,
  Separator,
  TextInput,
  CheckBox,
  Button,
} from '#components';
import { actionsToggleIsAutoLogin } from '#store/actions';
import { selectIsAutoLogin } from '#store/selectors';

const Signup = () => {
  // TODO: headerRight -> signin 으로 돌아가기
  const isAuthLogin = useStoreState(selectIsAutoLogin);
  const toggleIsAutoLogin = useStoreActions(actionsToggleIsAutoLogin);

  const a = 3;
  return (
    <View style={s.root}>
      <Text>서비스 이용을 위해 기본정보 입력 및 약관에 동의해 주세요</Text>
      <Separator
        style={s.separator}
        direction="horizontal"
        width="100%"
        height={1}
      />
      <Text style={s.accountInfoInstruction} isBold>
        ※ 계정정보
      </Text>
      <View>
        <TextInput placeholder="이메일을 입력해 주세요" />
        <Button style={s.checkEmailButton}>인증하기</Button>
        <TextInput placeholder="비밀번호를 입력해 주세요" />
        <TextInput placeholder="비밀번호를 다시 입력해 주세요" />
        <Button style={s.checkPasswordButton}>확인</Button>
      </View>

      <View>
        <View style={s.policyCheckBoxItem}>
          <CheckBox
            isChecked={isAuthLogin}
            onChange={toggleIsAutoLogin}
            highlightColor="blue"
          />
          <Text style={s.autoLoginText}>전체 동의</Text>
        </View>

        <View style={s.policyCheckBoxItem}>
          <CheckBox
            isChecked={isAuthLogin}
            onChange={toggleIsAutoLogin}
            highlightColor="blue"
          />
          <Text style={s.autoLoginText}>이용약관(필수)</Text>
          <Button style={s.policy}>내용</Button>
        </View>

        <View style={s.policyCheckBoxItem}>
          <CheckBox
            isChecked={isAuthLogin}
            onChange={toggleIsAutoLogin}
            highlightColor="blue"
          />
          <Text style={s.autoLoginText}>개인정보 취급방침(필수)</Text>
          <Button style={s.policy}>내용</Button>
        </View>

        <View style={s.policyCheckBoxItem}>
          <CheckBox
            isChecked={isAuthLogin}
            onChange={toggleIsAutoLogin}
            highlightColor="blue"
          />
          <Text style={s.autoLoginText}>마켓팅 이용 권한(선택)</Text>
          <Button style={s.policy}>내용</Button>
        </View>

        <View>
          <Button style={s.nextButton}>다음</Button>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const s = StyleSheet.create({
  root: {
    flex: 1,
    // marginVertical: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginTop: 15,
    marginBottom: 40,
  },
  accountInfoInstruction: {
    alignSelf: 'flex-start',
  },
  checkEmailButton: {
    position: 'absolute',
    right: '0%',
    top: '10%',
    // textDecorationLine: 'underline line-through',
  },
  checkPasswordButton: {
    position: 'absolute',
    right: '0%',
    top: '77%',
  },
  policyCheckBoxItem: {
    flexDirection: 'row',
  },
  nextButton: {
    paddingHorizontal: '40%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
  policy: {
    position: 'absolute',
    right: '0%',
    // top: '77%',
  },
});
