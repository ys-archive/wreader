import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

const EventModal = ({ eventImageUrl }) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={{ ...s.root, flex: !modalVisible ? 0 : 1 }}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <View style={s.root}>
          <View style={s.modalView}>
            <Text style={s.modalText}>Event Modal!</Text>
            <Pressable style={s.button} onPress={() => setModalVisible(false)}>
              <Text style={s.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EventModal;

const s = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.7)',
  },
  modalView: {
    width: 300,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
