import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MakeArrows = (dir, callbacks, clicker) => {
  return Object.entries(dir).map((d, i) => {
    const [direction, has] = d;

    if (has) {
      let arrowName = undefined;
      let style = undefined;

      switch (direction) {
        case "top":
          arrowName = `keyboard-arrow-up`;
          style = {
            position: "absolute",
            alignSelf: "center",
            top: hp("4%"),
          };
          break;

        case "bottom":
          arrowName = `keyboard-arrow-down`;
          style = {
            position: "absolute",
            top: hp("90%"),
            alignSelf: "center",
          };
          break;

        case "left":
          arrowName = `keyboard-arrow-left`;
          style = {
            position: "absolute",
            top: hp("45%"),
            right: wp("80%"),
          };
          break;

        case "right":
          arrowName = `keyboard-arrow-right`;
          style = {
            position: "absolute",
            top: hp("45%"),
            right: 0,
          };
          break;
      }

      return (
        <View style={{ ...style, zIndex: 10 }} key={`${direction}-${i}`}>
          <TouchableOpacity
            onPress={e => {
              console.log(`${direction} arrow is pressed!`);
              callbacks[direction]()(direction);
              clicker(true);
            }}
          >
            {/* colors.light.ivory2 */}
            <MaterialIcons name={arrowName} size={75} color='#36332F' />
          </TouchableOpacity>
        </View>
      );
    }
  });
};

export const renderArrowCategory = props => {
  const {
    coords: { d0 },
    maxCoords: { category, chapter },
    callbacks,
    clicker,
  } = props;

  const hasPrv = d0 !== 0 && d0 < category;
  const hasNxt = d0 < category - 1;
  const hasNxtDepth = chapter > 0;

  return MakeArrows(
    {
      top: hasPrv,
      bottom: hasNxt,
      right: hasNxtDepth,
    },
    callbacks,
    clicker,
  );
};

export const renderArrowChapter = props => {
  const {
    coords,
    maxCoords: { chapter: maxChapterCoord },
    depth,
    callbacks,
    clicker,
  } = props;
  const isEvenDepth = depth % 2 === 0;
  const compareDepth = coords[`d${depth}`];

  const hasPrvDepth = compareDepth === 0;
  const hasPrv = compareDepth !== 0;
  const hasNxt = compareDepth < maxChapterCoord;
  const hasNxtDepth = compareDepth < maxChapterCoord;

  if (depth === 1) {
    return MakeArrows(
      {
        left: hasPrvDepth,
        top: hasPrv,
        bottom: hasNxt,
        right: hasNxtDepth,
      },
      callbacks,
      clicker,
    );
  }

  const dir = isEvenDepth
    ? {
        left: hasPrvDepth ? hasPrvDepth : hasPrv,
        right: hasNxt,
        bottom: hasNxtDepth,
      }
    : {
        top: hasPrvDepth ? hasPrvDepth : hasPrv,
        right: hasNxtDepth,
        bottom: hasNxt,
      };

  return MakeArrows(dir, callbacks, clicker);
};
