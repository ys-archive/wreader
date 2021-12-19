import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet, Text, TextInput } from "#components";

import { useStoreState } from "easy-peasy";
import { selectEmail, selectUserInfo } from "#store/selectors";
import { selAuth } from "../../../../store/selectors";
import { Edit2 } from "#components/icon";
import { colors } from "#constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MyProfilePassword from "./MyProfilePassword";
import MyProfileUserName from "./MyProfileUserName";

const MyProfileAccountInfo = () => {
  const email = useStoreState(selAuth.email);

  const [isEditingUserName, setEditingUserName] = useState(false);
  const toggleEditingUserName = () => setEditingUserName(prv => !prv);

  const [isEditingPassword, setEditingPassword] = useState(false);
  const toggleEditingPassword = () => setEditingPassword(prv => !prv);

  return (
    <View>
      <MyProfileUserName isEditingUserName={isEditingUserName} />

      <Edit2
        style={{ position: "absolute", right: -10, top: 0 }}
        onPress={toggleEditingUserName}
      />

      <Text fontFamily="regular" style={s.title}>
        ACCOUNT INFO
      </Text>

      <Edit2
        style={{ position: "absolute", right: -10, top: 60 }}
        onPress={toggleEditingPassword}
      />

      <View style={s.separator} />

      <View style={s.accountInfoSection}>
        <View style={s.emailView}>
          <Text fontFamily='regular' style={s.infoPlaceholder}>
            E-MAIL
          </Text>
          <Text fontFamily='regular' style={s.emailText}>
            {email}
          </Text>
        </View>
        <View style={s.passwordView}>
          <MyProfilePassword isEditingPassword={isEditingPassword} />
        </View>
      </View>
    </View>
  );
};

export default MyProfileAccountInfo;

const s = StyleSheet.create({
  title: {
    marginTop: 45.6,
    fontSize: 21,
    color: "#fff",
    // textSpacing: -0.7
  },
  separator: {
    maxWidth: "55%",
    minHeight: 1,
    backgroundColor: colors.light.ivory5,
    marginTop: "2%",
  },

  accountInfoSection: {
    marginTop: hp("3.5%"),
  },

  emailView: {
    flexDirection: "row",
  },
  infoPlaceholder: {
    color: colors.light.white,
    fontSize: 15,
  },
  emailText: {
    marginLeft: wp("14.4%"),
    color: colors.light.white,
    fontSize: 15,
  },

  passwordView: {
    flexDirection: "row",
  },
});
