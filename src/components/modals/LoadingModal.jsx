import React, { useState } from "react"
import { View, Modal, ActivityIndicator } from "react-native"
import { Alert } from "#components/alert"
import { StyleSheet } from "../"

const LoadingModal = () => {
  const [modalVisible, setModalVisible] = useState(true)

  return (
    <View style={{ ...s.root, flex: !modalVisible ? 0 : 1 }}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
          setModalVisible(false)
        }}
      >
        <View style={s.root}>
          <ActivityIndicator />
        </View>
      </Modal>
    </View>
  )
}

LoadingModal.options = props => ({
  overlay: {
    interceptTouchOutside: true,
  },
})

export default LoadingModal

const s = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
    top: 0,
    left: 0,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: "rgba(0.2, 0.2, 0.2, 0.7)",
  },
})
