import React, { useState } from 'react';
import { View, Modal, Image } from 'react-native';
import { Button, StyleSheet, Text } from '../';

// TODO: 실제 url 받아서 webview 로 교체
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
            <Image
              style={{ maxWidth: '100%', maxHeight: '70%' }}
              source={require('!images/dummy-image.jpg')}
              resizeMode="contain"
            />
            <View style={s.buttonView}>
              {/* TODO: 하루동안 보지않기 기능 추가 */}
              <Button style={s.button} onPress={() => {}}>
                하루동안 보지않기
              </Button>
              <Button style={s.button} onPress={() => setModalVisible(false)}>
                닫기
              </Button>
            </View>
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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  buttonView: {
    position: 'relative',
    top: '40%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
