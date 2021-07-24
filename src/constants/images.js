import { getImagePathByScreenResolution } from '#utils';

const imageNames = [
  // TODO: 이미지 이름 수정본 받고, 모든 이미지 이름 다 넣기
  // TODO: 이미지 총 33개임 (이름 바꾸기 전 - 07.24)
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
  { imageName: '.jpg' },
];

export const loadedImages = {};

imageNames.forEach(image => {
  const name = image.imageName.split('.')[0];

  if (!name) {
    throw new Error(`이름 ${name[0]} 이 존재하지 않습니다.`);
  }

  // TODO: Test Image Fetch
  Object.assign(loadedImages, {
    [name]: require(getImagePathByScreenResolution(name)),
  });
});

console.log(imageNames);

export const loadImagesAsync = async () => {};
