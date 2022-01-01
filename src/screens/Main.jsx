import React from "react";
import { View } from "react-native";
import { Logo, Sort, Menu } from "../components/icon";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useNavigation } from "@react-navigation/native";

import { useAutoLogin } from "../hooks";

import EventModal from "#components/modals/EventModal";
import Reader from "./reader/Reader";
import CardsRenderer from "./cards/CardsRenderer";

import { useCardSorter } from "./cards/useCardSorter";
import { useCardResetToStartScreen } from "./cards/useCardResetToStartScreen";
import SortIndicator from "./cards/SortIndicator";

import { useStoreState } from "easy-peasy";
import { selSwiper } from "../store/selectors";
import ArrowReader from "./reader/ArrowReader";

const Main = () => {
  const nav = useNavigation();
  const depth = useStoreState(selSwiper.depth);

  useAutoLogin();

  const returnToMain = useCardResetToStartScreen();
  const { callback: onPressSortIcon, isSorterOpen } = useCardSorter();
  const onPressMenuIcon = () => nav.openDrawer();

  return (
    <View
      style={{
        minWidth: wp("100%"),
        maxWidth: wp("100%"),
        minHeight: hp("100%"),
        maxHeight: hp("100%"),
      }}
    >
      <Logo onPress={returnToMain} />
      {depth !== 0 && <Sort onPress={onPressSortIcon} />}
      {isSorterOpen && <SortIndicator />}
      <Menu onPress={onPressMenuIcon} />

      {/* <EventModal /> */}

      {/* <Reader>
        <CardsRenderer />
      </Reader> */}
      <ArrowReader>
        <CardsRenderer />
      </ArrowReader>

      {/* <CardsRenderer /> */}
    </View>
  );
};

export default Main;
