import { PixelRatio, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

export const getResolutionByPixelRatio = () => {
  const ratio = PixelRatio.get();
  let resolution = undefined;

  // android - mdpi
  // ios - x
  if (ratio < 1) {
    resolution = 'mdpi';
  }

  // android - hdpi
  // ios - x
  if (ratio <= 1 && ratio < 2) {
    resolution = 'hdpi';
  }

  // android - xhdpi
  // ios - iPhone se, 6s, 7, 8, xr, 11
  if (ratio <= 2 && ratio < 3) {
    resolution = 'xhdpi';
  }

  // android - xxhdpi, pixel, pixel2
  // ios - 6s+, 7+, 8+, x, xs, xs max, 11 pro, 11 pro max
  if (ratio <= 3 && ratio < 3.5) {
    resolution = 'xxhdpi';
  }

  // anroid - xxxhdpi, pixel xl, pixel 2 xl, nexus 6
  // ios - x
  if (ratio >= 3.5) {
    resolution = 'xxxhdpi';
  }

  return resolution;
};

export const getImagePathByScreenResolution = (
  level,
  imageFileName,
  ext = 'png',
) => {
  if (imageFileName === '') {
    throw new Error('이미지 파일 이름이 비어있으면 안 됩니다!');
  }

  const resolution = getResolutionByPixelRatio();

  let imageRoot = '';
  for (let i = 0; i < level; ++i) {
    imageRoot += '../';
  }

  imageRoot += `assets/images/${resolution}`;
  const imagePath = `${imageRoot}/${imageFileName}.${ext}`;
  // console.log(`pixel ratio: ${ratio}(${resolution}) :: ${imagePath}`);
  return imagePath;
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
