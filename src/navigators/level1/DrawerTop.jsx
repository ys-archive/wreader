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
import { useStoreState } from 'easy-peasy';
import { selectIsLoggedIn } from '#store/selectors';

const DrawerTop = props => {
  // TODO: Get user name from store and display
  const { navigation: nav } = props;
  const isLoggedIn = useStoreState(selectIsLoggedIn);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={s.root}>
      <SafeAreaView>
        <View style={s.elementPlacer}>
          <Ionicons
            name="close"
            size={35}
            color="white"
            style={s.closeDrawer}
            onPress={() => nav.closeDrawer()}
          />
          <Ionicons
            name="person-circle-outline"
            size={60}
            color="white"
            style={s.profile}
            onPress={() => nav.navigate(ScreenNames.MyProfileStack)}
          />
          <Text style={s.userName}>응애</Text>
        </View>
        <TouchableOpacity
          style={s.drawerItem}
          onPress={() => nav.navigate(ScreenNames.MainStack)}
        >
          <Text>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.drawerItem}
          onPress={() => nav.navigate(ScreenNames.ContactUsStack)}
        >
          <Text>문의하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.drawerItem}
          onPress={() => nav.navigate(ScreenNames.PolicyAndConditionStack)}
        >
          <Text>이용약관</Text>
        </TouchableOpacity>

        {!isLoggedIn && (
          <TouchableOpacity
            style={s.drawerItem}
            onPress={() => nav.navigate(ScreenNames.SigninStack)}
          >
            <Text>로그인</Text>
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
