import React from "react";
import { SafeAreaView, View, TouchableOpacity, Image } from "react-native";
import { Alert, AlertRequireLogin } from "#components/alert";
import { colors } from "#constants";
import { Cancel, Arrow, Person2 } from "#components/icon";
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  DrawerContentScrollView,
  // DrawerItemList,
  // DrawerItem,
} from "@react-navigation/drawer";
import { StyleSheet, Text } from "#components";
import * as ScreenNames from "../ScreenNames";

import { useStoreActions, useStoreState } from "easy-peasy";
import { actAuth, actImage } from "../../store/actions";
import { selImage, selAuth } from "../../store/selectors";

import { useProfileImageLoader } from "../../hooks";
import { useCardResetToStartScreen } from "../../screens/cards/useCardResetToStartScreen";

const initStates = () => {
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);
  const userInfo = useStoreState(selAuth.info);
  const profileImageUrl = useStoreState(selImage.profile);

  const nick = userInfo?.nick || "SIGN IN";

  const logout = useStoreActions(actAuth.logout);
  const resetProfile = useStoreActions(actImage.resetProfile);

  const resetMain = useCardResetToStartScreen();

  return {
    isLoggedIn,
    userInfo,
    profileImageUrl,
    nick,
    logout,
    resetProfile,
    resetMain,
  };
};

const DrawerTop = props => {
  const { navigation: nav } = props;
  const {
    isLoggedIn,
    userInfo,
    profileImageUrl,
    nick,
    logout,
    resetProfile,
    resetMain,
  } = initStates();

  // 프로필 이미지 로드
  useProfileImageLoader(isLoggedIn);

  const onPressProfileImage = () => {
    isLoggedIn
      ? nav.navigate(ScreenNames.MyProfileStack) // true -> 프로필 스크린으로 이동
      : Alert("Need login to see your profile", "close", () =>
          nav.navigate(ScreenNames.SigninStack),
        ); // false -> 로그인 확인 메시지
  };

  const onPressUserName = () => {
    if (nick === "SIGN IN") {
      nav.navigate(ScreenNames.SigninStack);
    }
  };

  const onLogout = () => {
    Alert("You've logged out");
    resetProfile();
    logout();
    nav.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={s.root}>
      <SafeAreaView>
        <View style={s.elementPlacer} pointerEvents='box-none'>
          {/* 드로어 닫기 */}
          <Cancel
            style={s.closeDrawerPlacer}
            iconStyle={s.closeDrawer}
            onPress={() => nav.closeDrawer()}
          />

          {/* 프로필 아이콘 or 프로필 이미지 */}
          {profileImageUrl ? (
            <TouchableOpacity onPress={onPressProfileImage}>
              <Image
                style={{ width: 45, height: 45, borderRadius: 50 }}
                source={{ uri: profileImageUrl }}
              />
            </TouchableOpacity>
          ) : (
            <Person2
              iconStyle={{ width: 45, height: 45, borderRadius: 50 }}
              onPress={onPressProfileImage}
            />
          )}

          {/* 유저 이름 */}
          <TouchableOpacity onPress={onPressUserName}>
            <Text
              fontFamily='bold'
              style={[s.userName, { marginLeft: 8, marginBottom: 9 }]}
            >
              {nick}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={s.drawerView}>
          <View style={s.drawerPlacer}>
            <Text>&nbsp;</Text>
          </View>

          {/* 홈 (스크린 이동) */}
          <TouchableOpacity
            style={s.drawerItem}
            onPress={() => {
              nav.navigate(ScreenNames.MainStack);
              resetMain();
            }}
          >
            <Text fontFamily='bold' style={s.drawerItemText}>
              HOME
            </Text>
            <Arrow
              style={s.drawerItemArrowPlacer}
              iconStyle={s.drawerItemArrow}
              onPress={() => {}}
              direction='right'
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
                <Text fontFamily='bold' style={s.drawerItemText}>
                  HELP & FEEDBACK
                </Text>
                <Arrow
                  style={s.drawerItemArrowPlacer}
                  iconStyle={s.drawerItemArrow}
                  onPress={() => {}}
                  direction='right'
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
            <Text fontFamily='bold' style={s.drawerItemText}>
              TERMS OF USE
            </Text>
            <Arrow
              style={s.drawerItemArrowPlacer}
              iconStyle={s.drawerItemArrow}
              onPress={() => {}}
              direction='right'
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
            //   <Text fontFamily="regular" style={s.drawerItemText}>
            //     LOG IN
            //   </Text>
            // </TouchableOpacity>
            // ) : (
            // 로그인 되어있으면 -> 로그아웃 실행
            <>
              <TouchableOpacity style={s.drawerItem} onPress={onLogout}>
                <Text fontFamily='bold' style={s.drawerItemText}>
                  LOGOUT
                </Text>
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
    backgroundColor: colors.light.ivory5,
    flex: 1,
  },
  elementPlacer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: colors.light.ivory5,
    minHeight: "14.9%",
    paddingLeft: 26.7,
    paddingBottom: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    zIndex: 1,
  },
  closeDrawer: {
    tintColor: colors.light.ivory1,
    minWidth: 18,
    maxWidth: 18,
    minHeight: 18,
    maxHeight: 18,
  },
  closeDrawerPlacer: {
    position: "absolute",
    right: "6.8%",
    top: "6.4%",
  },
  userNamePlacer: {
    position: "absolute",
    marginLeft: 11,
    top: -30,
  },
  userName: {
    color: "white",
    fontSize: 18,
  },
  drawerView: {
    backgroundColor: colors.light.ivory1,
    minHeight: "100%",
    position: "relative",
    top: -50,
  },
  drawerPlacer: {
    minHeight: hp("4.9%") + 50,
  },
  drawerItem: {
    marginLeft: "8.9%",
  },
  drawerItemText: {
    fontSize: 18,
    color: colors.light.ivory5,
  },
  drawerItemArrow: {
    minWidth: 8,
    maxWidth: 8,
    minHeight: 13,
    maxHeight: 13,
  },
  drawerItemArrowPlacer: {
    position: "absolute",
    right: "5%",
    top: 0,
  },
  separator: {
    maxWidth: "100%",
    minHeight: 1,
    backgroundColor: colors.light.ivory5,
    marginLeft: "5.9%",
    marginTop: "2%",
    marginBottom: "10.8%",
  },
});
