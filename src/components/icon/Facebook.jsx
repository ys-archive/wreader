import React from "react"
import { Image, TouchableOpacity } from "react-native"
import { facebookIcon } from "#constants/images"

const Facebook = ({ style }) => {
  return (
    <TouchableOpacity>
      <Image
        style={[
          {
            width: 15 + 4,
            height: 15 + 4,
            position: "absolute",
            top: "36%",
            left: "7.8%",
          },
          style,
        ]}
        source={facebookIcon}
      />
    </TouchableOpacity>
  )
}

export default Facebook
