import React from 'react';
import { View, Modal, SafeAreaView } from 'react-native';
import { StyleSheet, LocalImage, Button, Text } from '../';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign } from 'react-native-vector-icons';

import { StyleDefine } from '../../constants';

const CommentsModal = ({
  isCommentsOpen,
  setCommentsOpen,
  commentsCount,
  commentsData,
}) => {
  const onCloseModal = () => {
    setCommentsOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isCommentsOpen}
      onRequestClose={() => setCommentsOpen(false)}
    >
      <SafeAreaView style={s.root}>
        <View style={s.inside}>
          <View style={s.topSection}>
            <Text isBold style={s.commentsCountPlaceholderText}>
              Comments&nbsp;
              <Text style={s.commentsCountText}>{commentsCount || 0}</Text>
            </Text>

            <AntDesign
              name="closecircle"
              size={30}
              color="#000"
              onPress={onCloseModal}
            />
          </View>

          <View style={s.separator}></View>

          {
            // commentsData && commentsData?
          }
        </View>
      </SafeAreaView>
    </Modal>
  );
};

CommentsModal.options = props => ({
  overlay: {
    interceptTouchOutside: true,
  },
});

export default CommentsModal;

const s = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.7)',
  },
  inside: {
    minWidth: wp('95%'),
    minHeight: hp('60%'),
    backgroundColor: 'white',
    borderRadius: StyleDefine.borderRadiusOutside,
    padding: 15,
    alignItems: 'center',
  },
  topSection: {
    minWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  commentsCountPlaceholderText: {
    fontSize: 20,
    marginRight: 190,
  },
  commentsCountText: {
    fontSize: 25,
  },
  separator: {
    minWidth: '95%',
    minHeight: 1,
    color: '#000',
    backgroundColor: '#000',
    marginTop: '3%',
  },
});
