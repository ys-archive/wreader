import React from "react";
import { View, Modal, ActivityIndicator, Platform } from "react-native";
import { StyleSheet } from "../";

const LoadingModal = () => {
  return (
    <Modal animationType='fade' transparent>
      <View style={s.root}>
        {Platform.select({
          android: <ActivityIndicator size={50} color='#999' />,
          ios: <ActivityIndicator size='large' />,
        })}
      </View>
    </Modal>
  );
};

export default LoadingModal;

const s = StyleSheet.create({
  root: {
    flex: 1,
    // position: "relative",
    // top: 0,
    // left: 0,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0.2, 0.2, 0.2, 0.7)",
  },
});
