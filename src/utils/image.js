import { PixelRatio, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

export const getImagePathByScreenResolution = imageFileName => {
  if (imageFileName === '') {
    throw new Error('이미지 파일 이름이 비어있으면 안 됩니다!');
  }

  const ratio = PixelRatio.get();
  let imageRoot = undefined;

  // android - mdpi
  // ios - x
  if (ratio < 1) {
    imageRoot = '!images/mdpi';
    console.log('this is mdpi device');
  }

  // android - hdpi
  // ios - x
  if (ratio <= 1 && ratio < 2) {
    imageRoot = '!images/hdpi';
    console.log('this is hdpi device');
  }

  // android - xhdpi
  // ios - iPhone se, 6s, 7, 8, xr, 11
  if (ratio <= 2 && ratio < 3) {
    imageRoot = '!images/xhdpi';
    console.log('this is xhdpi device');
  }

  // android - xxhdpi, pixel, pixel2
  // ios - 6s+, 7+, 8+, x, xs, xs max, 11 pro, 11 pro max
  if (ratio <= 3 && ratio < 3.5) {
    imageRoot = '!images/xxhdpi';
    console.log('this is xxhdpi device');
  }

  // anroid - xxxhdpi, pixel xl, pixel 2 xl, nexus 6
  // ios - x
  if (ratio >= 3.5) {
    imageRoot = '!images/xxxhdpi';
    console.log('this is xxxhdpi device');
  }

  console.log(
    `current pixel ratio of this device is ${ratio}:${imageRoot
      .split()[1]
      .trim()}`,
  );

  const actualPath = `${imageRoot}${imageFileName}`;
  console.log(`actual path is @${actualPath}`);
  return actualPath;
};

export const getImageExtension = uri => {
  const baseName = uri.split(/[\\/]/).pop();
  return /[.]/.exec(baseName) ? /[^.]+$/.exec(baseName) : undefined;
};

export const cacheImage = async (uri, cacheUri, callback = undefined) => {
  try {
    const downloadImage = FileSystem.createDownloadResumable(
      uri,
      cacheUri,
      {},
      callback,
    );

    const downloaded = await downloadImage.downloadAsync();

    return {
      cached: true,
      error: false,
      path: downloaded.uri,
    };
  } catch (error) {
    return {
      cached: false,
      error: true,
      msg: error,
    };
  }
};

export const findImageInCache = async uri => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return { ...info, error: false };
  } catch (error) {
    return {
      exists: false,
      error: true,
      msg: error,
    };
  }
};
