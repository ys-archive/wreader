import React, { useMemo } from "react"
import { View, TouchableOpacity } from "react-native"

import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "../../constants"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const MakeArrows = (dir, callbacks, clicker) => {
  return Object.entries(dir).map((d, i) => {
    const [direction, has] = d

    if (has) {
      let arrowName = undefined
      let style = undefined

      switch (direction) {
        case "top":
          arrowName = `keyboard-arrow-up`
          style = {
            position: "absolute",
            alignSelf: "center",
            top: hp("4%"),
          }
          break

        case "bottom":
          arrowName = `keyboard-arrow-down`
          style = {
            position: "absolute",
            top: hp("90%"),
            alignSelf: "center",
          }
          break

        case "left":
          arrowName = `keyboard-arrow-left`
          style = {
            position: "absolute",
            top: hp("45%"),
            right: wp("80%"),
          }
          break

        case "right":
          arrowName = `keyboard-arrow-right`
          style = {
            position: "absolute",
            top: hp("45%"),
            right: 0,
          }
          break
      }

      return (
        <View style={{ ...style, zIndex: 10 }} key={`${direction}-${i}`}>
          <TouchableOpacity
            onPress={e => {
              console.log(`${direction} arrow is pressed!`)
              callbacks[direction]()(direction)
              clicker(true)
            }}
          >
            {/* colors.light.ivory2 */}
            <MaterialIcons name={arrowName} size={75} color='#36332F' />
          </TouchableOpacity>
        </View>
      )
    }
  })
}

export const renderWithDepth0Arrow = (
  coords,
  maxCoords,
  callbacks,
  clicker,
) => {
  const { d0 } = coords
  const { d0: md0, d1: md1 } = maxCoords

  const hasPrvCategory = d0 !== 0 && d0 < md0
  const hasNextCategory = d0 < md0 - 1
  const hasChapter = md1 > 0

  return MakeArrows(
    {
      top: hasPrvCategory,
      bottom: hasNextCategory,
      right: hasChapter,
    },
    callbacks,
    clicker,
  )
}

export const renderWithDepth1Arrow = (coords, chapters, callbacks, clicker) => {
  const { d0, d1 } = coords

  const hasCategory = d1 === 0
  const hasPrvChapter = d1 !== 0
  const hasNextChapter = chapters[d0][d1 + 1] !== undefined
  const hasUserChapter = chapters[d0][d1].child.length > 0

  return MakeArrows(
    {
      left: hasCategory ? hasCategory : hasPrvChapter,
      right: hasNextChapter,
      bottom: hasUserChapter,
    },
    callbacks,
    clicker,
  )
}

export const renderWithDepth2Arrow = (
  coords,
  maxCoords,
  chapters,
  callbacks,
  clicker,
) => {
  const { d0, d1, d2 } = coords
  const { d2: md2 } = maxCoords

  const hasChapter = d2 === 0
  const hasPrvUserChapter = d2 !== 0
  const hasNextUserChapter = d2 < md2 - 1
  const hasUserNext = chapters[d0][d1].child[d2].child.length > 0

  return MakeArrows(
    {
      top: hasChapter ? hasChapter : hasPrvUserChapter,
      right: hasUserNext,
      bottom: hasNextUserChapter,
    },
    callbacks,
    clicker,
  )
}

export const renderWithDepth3Arrow = (
  coords,
  maxCoords,
  callbacks,
  clicker,
) => {
  const { d0, d1, d2, d3 } = coords
  const { d3: md3 } = maxCoords

  const hasUserChapter = d3 === 0
  const hasPrvUserNext = d3 !== 0
  const hasNextUserNext = d3 < md3 - 1

  return MakeArrows(
    {
      left: hasUserChapter ? hasUserChapter : hasPrvUserNext,
      right: hasNextUserNext,
    },
    callbacks,
    clicker,
  )
}
