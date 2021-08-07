import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { Alert, RequireLoginAlert } from '#components/alert';
import { colors } from '#constants';
import { DrawerCancel, Arrow, Person2 } from '#components/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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

const DrawerTop = props => {
  const { navigation: nav } = props;
  const isLoggedIn = useStoreState(selectIsLoggedIn);
  const userInfo = useStoreState(selectUserInfo);
  const nick = userInfo !== null && userInfo.nick ? userInfo?.nick : 'SIGN IN';

  const logout = useStoreActions(actionsLogout);
  const profileImageUrl = useStoreState(selectProfileImageUrl);
  const profileLocalImagePath = useStoreState(selectProfileLocalImagePath);

  // const [defaultUri, setDefaultUri] = useState('');
  // 프로필 이미지 로드
  // useProfileImageLoader(setDefaultUri);

  const onPressProfileImage = () => {
    isLoggedIn
      ? nav.navigate(ScreenNames.MyProfileStack) // true -> 프로필 스크린으로 이동
      : RequireLoginAlert(); // false -> 로그인 확인 메시지
  };

  const onPressUserName = () => {
    if (nick === 'SIGN IN') {
      nav.navigate(ScreenNames.SigninStack);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={s.root}>
      <SafeAreaView>
        <View style={s.elementPlacer}>
          {/* 드로어 닫기 */}
          <DrawerCancel
            style={s.closeDrawer}
            onPress={() => nav.closeDrawer()}
          />

          {/* 프로필 아이콘 or 프로필 이미지 */}
          {profileImageUrl || profileLocalImagePath ? (
            <TouchableOpacity onPress={onPressProfileImage}>
              <Image
                style={[
                  s.profileImage,
                  { width: 40, height: 40, borderRadius: 50 },
                ]}
                source={{ uri: profileImageUrl || profileLocalImagePath }}
              />
            </TouchableOpacity>
          ) : (
            // <Ionicons
            //   name="person-circle-outline"
            //   size={60}
            //   color="white"
            //   style={s.profileImage}
            //   onPress={onPressProfileImage}
            // />
            <Person2 style={s.profileImage} />
          )}

          {/* 유저 이름 */}
          <TouchableOpacity onPress={onPressUserName}>
            <View style={s.userNamePlacer}>
              <Text isBold style={s.userName}>
                {nick}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={s.drawerView}>
          <View style={s.drawerPlacer}>
            <Text>&nbsp;</Text>
          </View>

          {/* 홈 (스크린 이동) */}
          <TouchableOpacity
            style={s.drawerItem}
            onPress={() => nav.navigate(ScreenNames.MainStack)}
          >
            <Text isBold style={s.drawerItemText}>
              HOME
            </Text>
            <Arrow
              style={s.drawerItemArrow}
              onPress={() => {}}
              direction="right"
            />
          </TouchableOpacity>

          <View style={s.separator} />

          {/* 문의하기 (스크린 이동) */}
          {isLoggedIn && (
            <>
              <TouchableOpacity
                style={s.drawerItem}
                onPress={() => nav.navigate(ScreenNames.ContactUsStack)}
              >
                <Text isBold style={s.drawerItemText}>
                  HELP & FEEDBACK
                </Text>
                <Arrow
                  style={s.drawerItemArrow}
                  onPress={() => {}}
                  direction="right"
                />
              </TouchableOpacity>
              <View style={s.separator} />
            </>
          )}

          {/* 이용약관 (스크린 이동) */}
          <TouchableOpacity
            style={s.drawerItem}
            onPress={() => nav.navigate(ScreenNames.PolicyAndConditionStack)}
          >
            <Text isBold style={s.drawerItemText}>
              TERMS OF USE
            </Text>
            <Arrow
              style={s.drawerItemArrow}
              onPress={() => {}}
              direction="right"
            />
          </TouchableOpacity>

          <View style={s.separator} />

          {/* 로그인 안되어 있으면 -> 로그인 (스크린 이동) */}
          {isLoggedIn && (
            // (
            // <TouchableOpacity
            //   style={s.drawerItem}
            //   onPress={() => nav.navigate(ScreenNames.SigninStack)}
            // >
            //   <Text isBold style={s.drawerItemText}>
            //     LOG IN
            //   </Text>
            // </TouchableOpacity>
            // ) : (
            // 로그인 되어있으면 -> 로그아웃 실행
            <>
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
              <View style={s.separator} />
            </>
          )}
        </View>
        {/* <DrawerItemList {...props} /> */}
        {/* <DrawerItem label="help" onPress={() => console.log('help clicked')} /> */}
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

export default DrawerTop;

const s = StyleSheet.create({
  root: {
    backgroundColor: colors.light.ivory4,
    flex: 1,
  },
  elementPlacer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.light.ivory4,
    minHeight: '21.9%',
    paddingLeft: 26.7,
    paddingBottom: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    zIndex: 5,
  },
  profileImage: {},
  userNamePlacer: {
    position: 'absolute',
    marginLeft: 9,
    top: -28,
  },
  userName: {
    color: 'white',
    fontSize: 22,
  },
  drawerView: {
    backgroundColor: colors.light.ivory1,
    minHeight: '100%',
    position: 'relative',
    top: -50,
  },
  drawerPlacer: {
    minHeight: hp('4.9%') + 50,
  },
  drawerItem: {
    marginLeft: '8.9%',
  },
  drawerItemText: {
    fontSize: 18,
    color: colors.light.ivory4,
  },
  drawerItemArrow: {
    position: 'absolute',
    right: wp('7.3%'),
    top: 0,
  },
  separator: {
    maxWidth: '100%',
    minHeight: 1,
    backgroundColor: colors.light.ivory4,
    marginLeft: '5.9%',
    marginTop: '2%',
    marginBottom: '10.8%',
  },
  closeDrawer: {
    position: 'absolute',
    right: '6.8%',
    top: '16.4%',
  },
});
