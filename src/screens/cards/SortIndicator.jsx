import React from "react";
import { StyleSheet, Text } from "#components";
import { filterBox } from "../../constants/images";
import { View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../constants/colors";

import { useStoreState } from "easy-peasy";
import { selSort } from "../../store/selectors";

const initStates = () => {
  const isSortedByLikes = useStoreState(selSort.isSortedByLikes);

  return {
    isSortedByLikes,
  };
};

const SortIndicator = () => {
  const { isSortedByLikes } = initStates();

  console.log(`is sorted by likes? : ${isSortedByLikes}`);
  const popularFontFamily = isSortedByLikes ? "bold" : "regular";
  const dateFontFamily = !isSortedByLikes ? "bold" : "regular";

  return (
    <>
      <Image
        style={{
          position: "absolute",
          top: hp("8%"),
          right: wp("5%"),
          zIndex: 1000,
        }}
        source={filterBox}
      />
      <View style={s.labelView}>
        <Text fontFamily={popularFontFamily} style={s.label}>
          POPULAR
        </Text>
        <View style={s.separator} />
        <Text fontFamily={dateFontFamily} style={s.label}>
          NEW
        </Text>
      </View>
    </>
  );
};

export default SortIndicator;

const s = StyleSheet.create({
  labelView: {
    position: "absolute",
    top: hp("10.5%"),
    right: wp("12%"),
    zIndex: 1001,
    paddingBottom: 5 
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    color: colors.light.ivory2,
  },
  separator: {
    backgroundColor: colors.light.ivory2,
    minHeight: 1,
    marginVertical: 3,
  },
});
