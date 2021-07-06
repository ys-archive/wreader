import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, Text } from '#components';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenNames from '../ScreenNames';

const DrawerTop = props => {
  // TODO: Get user name from store
  const { navigation: nav } = props;
  // console.log(exceptUserInfo);
  // console.log(nav);
  // exceptUserInfo.routes = exceptUserInfo.routes.filter(
  //   route => route.name !== ScreenNames.UserInfoStack,
  // );

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={s.root}>
      <SafeAreaView>
        <View style={s.elementPlacer}>
          <Ionicons
            name="person-circle-outline"
            size={70}
            color="white"
            style={s.profile}
            onPress={() => nav.navigate(ScreenNames.MyProfile)}
          />
          <Text style={s.userName}>응애</Text>
        </View>
        {/* <DrawerItemList {...props} /> */}
        {/* <DrawerItemList state={exceptUserInfo} {...rest} /> */}
        <TouchableOpacity onPress={() => nav.navigate(ScreenNames.Main)}>
          <Text>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.navigate(ScreenNames.ContactUsStack)}
        >
          <Text>문의하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.navigate(ScreenNames.PolicyAndConditionStack)}
        >
          <Text>이용약관</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => nav.navigate(ScreenNames.SigninStack)}>
          <Text>로그인</Text>
        </TouchableOpacity>

        {/* <DrawerItem label="help" onPress={() => console.log('help clicked')} /> */}
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

export default DrawerTop;

const s = StyleSheet.create({
  root: {
    // height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  elementPlacer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    height: '35%',
    paddingLeft: 10,
  },
  profile: {
    // position: 'relative',
    // top: '25%',
    // left: '5%',
  },
  userName: {
    color: 'white',
    fontSize: 24,
  },
});
