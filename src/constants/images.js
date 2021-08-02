import {
  getImagePathByScreenResolution,
  getResolutionByPixelRatio,
} from '#utils';

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

export const getResolutionIdx = () => {
  const resolution = getResolutionByPixelRatio();

  if (resolution === 'hdpi') {
    return 0;
  }

  if (resolution === 'mdpi') {
    return 1;
  }

  if (resolution === 'xhdpi') {
    return 2;
  }

  if (resolution === 'xxhdpi') {
    return 3;
  }

  if (resolution === 'xxxhdpi') {
    return 4;
  }
};

// export const romance = require('!images/xxxhdpi/romance-category-bg.png'),;
// export const crime = require('!images/xxxhdpi/crime-category-bg.png'),;
// export const fantasy = require('!images/xxxhdpi/fantasy-category-bg.png'),;
// export const thriller = require('!images/xxxhdpi/thriller-category-bg.png'),;
// export const adult = require('!images/xxxhdpi/adult-category-bg.png'),;

// export const h_logo = require('!images/hdpi/app-logo.png');
// export const m_logo = require('!images/mdpi/app-logo.png');
// export const xh_logo = require('!images/xhdpi/app-logo.png');
// export const xxh_logo = require('!images/xxhdpi/app-logo.png');
// export const xxxh_logo = require('!images/xxxhdpi/app-logo.png');

// const romanceCategoryBGs = [
//   require('!images/hdpi/romance-category-bg.png'),
//   require('!images/mdpi/romance-category-bg.png'),
//   require('!images/xhdpi/romance-category-bg.png'),
//   require('!images/xxhdpi/romance-category-bg.png'),
//   require('!images/xxxhdpi/romance-category-bg.png'),
// ];

// const crimeCategoryBGs = [
//   require('!images/hdpi/crime-category-bg.png'),
//   require('!images/mdpi/crime-category-bg.png'),
//   require('!images/xhdpi/crime-category-bg.png'),
//   require('!images/xxhdpi/crime-category-bg.png'),
//   require('!images/xxxhdpi/crime-category-bg.png'),
// ];

// const fantasyCategoryBGs = [
//   require('!images/hdpi/fantasy-category-bg.png'),
//   require('!images/mdpi/fantasy-category-bg.png'),
//   require('!images/xhdpi/fantasy-category-bg.png'),
//   require('!images/xxhdpi/fantasy-category-bg.png'),
//   require('!images/xxxhdpi/fantasy-category-bg.png'),
// ];

// const thrillerCategoryBGs = [
//   require('!images/hdpi/thriller-category-bg.png'),
//   require('!images/mdpi/thriller-category-bg.png'),
//   require('!images/xhdpi/thriller-category-bg.png'),
//   require('!images/xxhdpi/thriller-category-bg.png'),
//   require('!images/xxxhdpi/thriller-category-bg.png'),
// ];

// const adultCategoryBGs = [
//   require('!images/hdpi/adult-category-bg.png'),
//   require('!images/mdpi/adult-category-bg.png'),
//   require('!images/xhdpi/adult-category-bg.png'),
//   require('!images/xxhdpi/adult-category-bg.png'),
//   require('!images/xxxhdpi/adult-category-bg.png'),
// ];

// const logos = [
//   require('!images/hdpi/app-logo.png'),
//   require('!images/mdpi/app-logo.png'),
//   require('!images/xhdpi/app-logo.png'),
//   require('!images/xxhdpi/app-logo.png'),
//   require('!images/xxxhdpi/app-logo.png'),
// ];

// const sortIcons = [
//   require('!images/hdpi/sort-icon.png'),
//   require('!images/mdpi/sort-icon.png'),
//   require('!images/xhdpi/sort-icon.png'),
//   require('!images/xxhdpi/sort-icon.png'),
//   require('!images/xxxhdpi/sort-icon.png'),
// ];

// export const getRomanceCategoryBG = () =>
//   romanceCategoryBGs[getResolutionIdx()];

// export const getCrimeCategoryBG = () => crimeCategoryBGs[getResolutionIdx()];

// export const getFantasyCategoryBG = () =>
//   fantasyCategoryBGs[getResolutionIdx()];

// export const getThrillerCategoryBG = () =>
//   thrillerCategoryBGs[getResolutionIdx()];

// export const getAdultCategoryBG = () => adultCategoryBGs[getResolutionIdx()];

// export const getLogo = () => logos[getResolutionIdx()];

// export const getSortIcons = () => sortIcons[getResolutionIdx()];

export const romanceCategoryBG = require('!images/romance-category-bg.png');
export const fantasyCategoryBG = require('!images/fantasy-category-bg.png');
export const thrillerCategoryBG = require('!images/thriller-category-bg.png');
export const adultCategoryBG = require('!images/adult-category-bg.png');
export const crimeCategoryBG = require('!images/crime-category-bg.png');

export const logo = require('!images/app-logo.png');
export const sortIcon = require('!images/sort-icon.png');
export const likeIcon = require('!images/like-icon.png');
export const viewCountIcon = require('!images/view-count-icon.png');
export const replyIcon = require('!images/reply-icon.png');
