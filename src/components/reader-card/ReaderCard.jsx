import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text, StyleSheet, LocalImage } from '#components';
import { FontAwesome } from 'react-native-vector-icons';

// TODO: change image uri -> fetched (received from the api)
const image = require('../../../assets/images/dummy-image.jpg');

const { width, height } = Dimensions.get('window');

const ReaderCard = ({ path: uri, title, content }) => {
  // console.log(uri);
  return (
    <View style={s.root}>
      <View style={s.cardTopView}>
        <Text>챕터 1</Text>
        <FontAwesome name="sort-amount-desc" size={24} color="black" />
      </View>
      <View style={s.cardImageView}>
        <LocalImage
          source={image}
          resizeMode="cover"
          style={{ width: width * 0.8, height: height * 0.6 }}
        />
      </View>
      <Text style={s.cardOverlay} textStyle={s.cardOverlayText}>
        {content ?? ''}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {/* Profile */}
        <View style={{ flexDirection: 'row' }}>
          {/* TODO: 프로필 사진 */}
          {/* TODO: 유저 이름 */}
        </View>

        {/* Comments */}
        <View style={{ flexDirection: 'row' }}>
          {/* TODO: 코멘트 아이콘 */}
          {/* TODO: 코멘트 카운트 */}
        </View>

        {/* Likes */}
        <View style={{ flexDirection: 'row' }}>
          {/* TODO: 좋아요 아이콘 */}
          {/* TODO: 좋아요 개수 */}
        </View>
      </View>
    </View>
  );
};

export default ReaderCard;

const s = StyleSheet.create({
  root: {
    minWidth: width,
    minHeight: height,
    paddingHorizontal: 35,
  },
  cardTopView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
    marginTop: 40,
    marginBottom: 10,
  },
  cardImageView: {
    borderWidth: 1,
    borderColor: 'black',
  },
  cardOverlay: {
    position: 'absolute',
    left: '15%',
    top: '25%',
    padding: 55,
    fontSize: 23,
  },
});
