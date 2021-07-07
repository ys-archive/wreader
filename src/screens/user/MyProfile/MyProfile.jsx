import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import { Text } from '#components';
import { Ionicons } from '@expo/vector-icons';

import MyProfilePassword from './components/MyProfilePassword';
import MyProfileBasicInfo from './components/MyProfileBasicInfo';

const MyProfile = () => {
  // TODO: get user email from store
  // TODO: get user nickname from store
  // TODO: get user instagram from store
  // TODO: get user facebook from store
  // TODO: get user introduction from store
  return (
    <ScrollView>
      <KeyboardAvoidingView style={s.root}>
        <View style={s.profileImageView}>
          <Image style={s.profileImage} source={require('!images/dog.jpg')} />
          <Ionicons
            style={s.cameraIcon}
            name="camera"
            size={48}
            color="black"
          />
        </View>

        <View style={s.accountView}>
          <Text isBold>계정정보</Text>

          <View style={s.accountInfoView}>
            <View style={s.emailView}>
              <Text>이메일:&nbsp;</Text>
              <Text style={{ marginLeft: 50 }}>test1234@gmail.com</Text>
            </View>
            <View style={s.passwordView}>
              <MyProfilePassword />
            </View>
          </View>
        </View>

        <View style={s.basicView}>
          <Text isBold>⁕ 기본정보</Text>
          <MyProfileBasicInfo />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default MyProfile;

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  profileImageView: {
    alignSelf: 'center',
  },
  profileImage: {
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: 100,
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  accountInfoView: {
    marginLeft: 20,
  },
  emailView: {
    flexDirection: 'row',
  },
  passwordView: {
    flexDirection: 'row',
  },
  infoNamePlaceText: {
    // textAlign: 'right',
    letterSpacing: 1.5,
  },
  accountView: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  basicView: {
    marginTop: 25,
  },
  infoEmailText: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '90%',
  },
});
