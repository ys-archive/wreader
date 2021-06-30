import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const nav = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={s.root}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <View style={s.root}>
          <View style={s.modalView}>
            <Text style={s.modalText}>Hello World!</Text>
            <Pressable style={s.button} onPress={() => setModalVisible(false)}>
              <Text style={s.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[s.button, s.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={s.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
