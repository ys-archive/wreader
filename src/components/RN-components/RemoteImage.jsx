import React, { useState, useEffect, useRef } from 'react';
import * as FileSystem from 'expo-file-system';
import PropTypes from 'prop-types';
import { Image, Alert, ActivityIndicator, View } from 'react-native';
// import { StyleSheet } from '../';
import { getImageExtension, findImageInCache, cacheImage } from '#utils';

// TODO: mdpi, hdpi, xdpi, xxdpi, xxxdpi 처리 필요?

export const RemoteImage = ({ uri, cacheKey, style = {}, ...rest }) => {
  const isMounted = useRef(true).current;
  const [imgUri, setImageUri] = useState('');
  useEffect(() => {
    (async function loadImage() {
      // 1. 파일 확장자 뽑기
      const imageExt = getImageExtension(uri);
      if (!imageExt || !imageExt.length) {
        Alert.alert(`이미지 로드 실패 ! @ ${uri}`);
        return;
      }

      // 2. 캐시이미지 파일 uri 얻기
      const cacheFileUri = `${FileSystem.cacheDirectory}${cacheKey}.${imageExt[0]}`;
      // 캐싱되어있는지 확인
      const imageExistInCache = await findImageInCache(cacheFileUri);

      if (!imageExistInCache.exists) {
        // 안 되어 있으면, 새롭게 캐싱
        const cached = await cacheImage(uri, cacheFileUri, () => {});

        if (!cached.cached) {
          Alert.alert(`이미지 @ ${uri} 로드 실패`);
        }

        console.log(`이미지 @ ${uri} 이 새로 캐싱됨!`);
        setImageUri(cached.path);
      }

      console.log(`이미지 @ ${uri} 에 존재!`);
      setImageUri(cacheFileUri);
      return () => (isMounted = false);
    })();
  }, []);

  return (
    <>
      {imgUri ? (
        <Image
          source={{ uri: imgUri }}
          // style={[style, s.root]}
          {...rest}
        />
      ) : (
        <View
          style={{ ...style, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={33} />
        </View>
      )}
    </>
  );
};

RemoteImage.propTypes = {
  isLocal: PropTypes.bool,
  uri: PropTypes.string.isRequired,
  cacheKey: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

RemoteImage.defaultProps = {
  isLocal: true,
  style: {},
};

// const s = StyleSheet.create({
//   root: {
//     width: {},
//   },
// });
