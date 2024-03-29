import React from "react"
import { ImageBackground, View } from "react-native"
import { StyleSheet } from "#components"

import { useNavigation } from "@react-navigation/native"

import { bg } from "#constants/images"
import { LogoSignin, Cancel } from "#components/icon"
import { colors } from "#constants"

import SigninForms from "./components/forms/SigninForms"
import SigninFindPasswordSignup from "./components/SigninFindPasswordSignup"

const Signin = () => {
  const nav = useNavigation()
  const onPressGoBackIcon = () => {
    // nav.navigate(ScreenNames.Signin);
    nav.goBack()
  }

  return (
    // <KeyboardAwareScrollView contentContainerStyle={s.root}>
    <View style={s.root}>
      <ImageBackground
        style={{
          minWidth: "100%",
          minHeight: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.light.background,
          flex: 1,
        }}
        source={bg}
        resizeMode="cover"
      >
        <Cancel
          onPress={onPressGoBackIcon}
          style={{ top: "7%", right: "5%" }}
        />
        <LogoSignin />
        <SigninForms />
        <SigninFindPasswordSignup />
      </ImageBackground>
      {/* </KeyboardAwareScrollView> */}
    </View>
  )
}

export default Signin

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: colors.light.background,
  },
})
