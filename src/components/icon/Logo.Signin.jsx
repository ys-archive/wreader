import React from "react"
import { Image, Platform } from "react-native"
import { logoIcon } from "#constants/images"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const LogoSignin = () => (
  <Image
    style={{
      ...Platform.select({
        ios: {
          width: "77.4%",
          position: "absolute",
          top: "25.5%",
        },
        android: {
          width: "74.4%",
          minWidth: "74.4%",
          position: "absolute",
          top: "15.5%",
        },
      }),
    }}
    source={logoIcon}
    resizeMode="contain"
  />
)

export default LogoSignin
