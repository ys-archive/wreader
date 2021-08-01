import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import {
  DrawerContentScrollView,
  // DrawerItemList,
  // DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, Text } from '#components';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenNames from '../ScreenNames';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  selectIsLoggedIn,
  selectUserInfo,
  selectProfileImageUrl,
  selectProfileLocalImagePath,
} from '#store/selectors';
import { actionsLogout } from '#store/actions';
import { useProfileImageLoader } from '#hooks';
import { Alert, RequireLoginAlert } from '#components/alert';

const DrawerTop = props => {
  const { navigation: nav } = props;
  const isLoggedIn = useStoreState(selectIsLoggedIn);
  const userInfo = useStoreState(selectUserInfo);
  console.log(userInfo);
  const nick = userInfo !== null ? userInfo?.nick : '';

  const logout = useStoreActions(actionsLogout);
  const profileImageUrl = useStoreState(selectProfileImageUrl);
  const profileLocalImagePath = useStoreState(selectProfileLocalImagePath);

  // const [defaultUri, setDefaultUri] = useState('');
  // 프로필 이미지 로드
  // useProfileImageLoader(setDefaultUri);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={s.root}>
      <SafeAreaView>
        <View style={s.elementPlacer}>
          {/* 드로어 닫기 */}
          <Ionicons
            name="close"
            size={35}
            color="white"
            style={s.closeDrawer}
            onPress={() => nav.closeDrawer()}
          />

          {/* 프로필 아이콘 or 프로필 이미지 */}
          {profileImageUrl || profileLocalImagePath ? (
            <Image
              style={[
                s.profile,
                { width: wp('80%'), height: hp('35%'), borderRadius: 50 },
              ]}
              source={{ uri: profileImageUrl || profileLocalImagePath }}
            />
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={60}
              color="white"
              style={s.profile}
              onPress={
                () =>
                  isLoggedIn
                    ? nav.navigate(ScreenNames.MyProfileStack) // true -> 프로필 스크린으로 이동
                    : RequireLoginAlert() // false -> 로그인 확인 메시지
              }
            />
          )}

          {/* 유저 이름 */}
          <Text style={s.userName}>{nick ?? ''}</Text>
        </View>

        {/* 홈 (스크린 이동) */}
        <TouchableOpacity
          style={s.drawerItem}
          onPress={() => nav.navigate(ScreenNames.MainStack)}
        >
          <Text>홈</Text>
        </TouchableOpacity>

        {/* 문의하기 (스크린 이동) */}
        {isLoggedIn && (
          <TouchableOpacity
            style={s.drawerItem}
            onPress={() => nav.navigate(ScreenNames.ContactUsStack)}
          >
            <Text>문의하기</Text>
          </TouchableOpacity>
        )}

        {/* 이용약관 (스크린 이동) */}
        <TouchableOpacity
          style={s.drawerItem}
          onPress={() => nav.navigate(ScreenNames.PolicyAndConditionStack)}
        >
          <Text>이용약관</Text>
        </TouchableOpacity>

        {/* 로그인 안되어 있으면 -> 로그인 (스크린 이동) */}
        {!isLoggedIn ? (
          <TouchableOpacity
            style={s.drawerItem}
            onPress={() => nav.navigate(ScreenNames.SigninStack)}
          >
            <Text>로그인</Text>
          </TouchableOpacity>
        ) : (
          // 로그인 되어있으면 -> 로그아웃 실행
          <TouchableOpacity
            style={s.drawerItem}
            onPress={() => {
              Alert('로그아웃 되었습니다');
              logout();
              nav.closeDrawer();
            }}
          >
            <Text>로그아웃</Text>
          </TouchableOpacity>
        )}
        {/* <DrawerItemList {...props} /> */}
        {/* <DrawerItem label="help" onPress={() => console.log('help clicked')} /> */}
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

export default DrawerTop;

const s = StyleSheet.create({
  root: {
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
  drawerItem: {
    marginLeft: 10,
    marginVertical: 10,
  },
  closeDrawer: {
    position: 'absolute',
    left: '85%',
    top: '10%',
  },
  profile: {
    // position: 'relative',
    // top: '25%',
    // left: '5%',
  },
  userName: {
    color: 'white',
    fontSize: 22,
  },
});
