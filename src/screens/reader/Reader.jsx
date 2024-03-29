import React from "react"
import { Animated, View, Platform } from "react-native"
import { StyleSheet } from "#components"
import { colors } from "../../constants/colors"
import GestureRecognizer from "react-native-swipe-gestures"
import {
  useSwipeGesture,
  useSwipeLeft,
  useSwipeRight,
  useSwipeUp,
  useSwipeDown,
} from "../../hooks"

const swipeConfig = {
  velocityThreshold: Platform.select({ ios: 0.4, android: 0.2 }),
  directionalOffsetThreshold: 35,
  gestureIsClickThreshold: Platform.select({ ios: 5, android: 2 }),
}

const Reader = ({ children }) => {
  const { swipe, getStyle } = useSwipeGesture()

  const swipeLeft = useSwipeLeft(swipe)
  const swipeRight = useSwipeRight(swipe)
  const swipeUp = useSwipeUp(swipe)
  const swipeDown = useSwipeDown(swipe)

  return (
    <View>
      <GestureRecognizer
        onSwipeLeft={state => swipeLeft()(state)}
        onSwipeRight={state => swipeRight()(state)}
        onSwipeUp={state => swipeUp()(state)}
        onSwipeDown={state => swipeDown()(state)}
        config={swipeConfig}
        style={s.recognizer}
      >
        <Animated.View style={[getStyle()]}>{children}</Animated.View>
      </GestureRecognizer>
    </View>
  )
}

export default Reader

const s = StyleSheet.create({
  recognizer: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: colors.light.primaryTransparent,
  },
})
