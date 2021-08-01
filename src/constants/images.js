import { getImagePathByScreenResolution } from '#utils';

const makeUriByResolution = (level, name, ext = 'png') =>
  `${getImagePathByScreenResolution(level, name, ext)}`;

const images = {
  romance: level => makeUriByResolution(level, 'romance-category-bg'),
  crime: level => makeUriByResolution(level, 'crime-category-bg'),
  fantasy: level => makeUriByResolution(level, 'fantasy-category-bg'),
  thriller: level => makeUriByResolution(level, 'thriller-category-bg'),
  adult: level => makeUriByResolution(level, 'adult-category-bg'),
  logo: level => makeUriByResolution(level, 'app-logo'),
  likeIcon: level => makeUriByResolution(level, 'like-icon'),
  sortIcon: level => makeUriByResolution(level, 'sort-icon'),
  viewCountIcon: level => makeUriByResolution(level, 'view-count-icon'),
  splash: level => makeUriByResolution(level, 'splash'),
};

export const getImage = (level, name) => {
  // console.log(Object.keys(images)[name]);

  const img = images[`${name}`];

  if (img && img(level)) {
    const result = img(level);
    // console.log('카테고리 배경이미지: ', result);
    return result;
  }
};
