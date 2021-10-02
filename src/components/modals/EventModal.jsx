import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { Alert } from '#components/alert';
import { Button, StyleSheet, LocalImage } from '../';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import { useStoreActions } from 'easy-peasy';
// import { actionsIgnoreEventModalFor1day } from '#store/actions';

import { StyleDefine } from '../../constants';

// TODO: 실제 url 받아서 webview 로 교체
const EventModal = ({ eventImageUrl }) => {
  const [modalVisible, setModalVisible] = useState(true);

  // const ignoreEventModalFor1day = useStoreActions(actionsIgnoreEventModalFor1day);

  const onCloseModalFor1day = () => {
    // TODO: 하루간 보지 않기 세부 구현
    // ignoreEventModalFor1day();
    setModalVisible(false);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

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
            <LocalImage
              style={{ maxWidth: '100%', maxHeight: '70%' }}
              source={require('!images/dummy-image.jpg')}
              resizeMode="contain"
            />
            <View style={s.buttonView}>
              {/* TODO: 하루동안 보지않기 기능 추가 */}
              {/* TODO: persistence -> storage 에 duration 저장 후 
                앱 시작할 떄마다 currentTime 과 체크*/}
              <Button style={s.button} onPress={onCloseModalFor1day}>
                하루동안 보지않기
              </Button>
              <Button style={s.button} onPress={onCloseModal}>
                닫기
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

EventModal.options = props => ({
  overlay: {
    interceptTouchOutside: true,
  },
});

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
    width: wp('80%'),
    height: hp('100%'),
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: StyleDefine.borderRadiusOutside,
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
    top: '25%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
