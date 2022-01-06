import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
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

export const renderWithDepth0Arrow = (
  coords,
  maxCoords,
  callbacks,
  clicker,
) => {
  const { d0 } = coords;
  const { category, chapter } = maxCoords;

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

export const renderWithDepth1Arrow = (
  coords,
  maxCoords,
  callbacks,
  clicker,
) => {
  const { d1 } = coords;
  const { chapter } = maxCoords;

  const hasPrvDepth = d1 === 0;
  const hasPrv = d1 !== 0;
  // const hasNxtChapter = chapters[d0][d1 + 1] !== undefined;
  const hasNxt = d1 < chapter;
  const hasNxtDepth = d1 < chapter;

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
};

export const renderWithDepth2Arrow = (
  coords,
  maxCoords,
  callbacks,
  clicker,
) => {
  const { d2 } = coords;
  const { chapter } = maxCoords;

  const hasPrvDepth = d2 === 0;
  const hasPrv = d2 !== 0;
  const hasNxt = d2 < chapter;
  // const hasUserNext = chapters[d0][d1].child[d2].child.length > 0;
  const hasNxtDepth = d2 < chapter;

  return MakeArrows(
    {
      left: hasPrvDepth ? hasPrvDepth : hasPrv,
      right: hasNxt,
      bottom: hasNxtDepth,
    },
    callbacks,
    clicker,
  );
};

export const renderWithDepth3Arrow = (
  coords,
  maxCoords,
  callbacks,
  clicker,
) => {
  const { d3 } = coords;
  const { chapter } = maxCoords;

  const hasPrvDepth = d3 === 0;
  const hasPrv = d3 !== 0;
  const hasNxt = d3 < chapter;
  const hasNxtDepth = d3 < chapter;

  return MakeArrows(
    {
      top: hasPrvDepth ? hasPrvDepth : hasPrv,
      right: hasNxtDepth,
      bottom: hasNxt,
    },
    callbacks,
    clicker,
  );
};

export const renderWithDepth4Arrow = (
  coords,
  maxCoords,
  callbacks,
  clicker,
) => {
  const { d4 } = coords;
  const { chapter } = maxCoords;

  const hasPrvDepth = d4 === 0;
  const hasPrv = d4 !== 0;
  const hasNxt = d4 < chapter;
  const hasNxtDepth = d4 < chapter;

  return MakeArrows(
    {
      top: hasPrvDepth ? hasPrvDepth : hasPrv,
      bottom: hasNxt,
      right: hasNxtDepth,
    },
    callbacks,
    clicker,
  );
};
