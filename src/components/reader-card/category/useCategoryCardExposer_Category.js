import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const useCategoryCardExposer_Category = (
  isNextCategory,
  isPreviousCategory,
  isVisibleFromChapter,
) => {
  const predicatedPosition = isNextCategory
    ? {
        position: 'absolute',
        top: '-5%',
      }
    : isPreviousCategory
    ? {
        position: 'absolute',
        bottom: '-7%',
      }
    : isVisibleFromChapter
    ? {
        position: 'absolute',
        right: '-5%',
      }
    : {};

  const predicatedScale =
    isNextCategory || isPreviousCategory || isVisibleFromChapter
      ? {
          width: wp('83.4%') * 0.9,
          height: hp('78.2%') * 0.9,
        }
      : {};

  // const predicatedOpacity = isNext || isPrevious ? { opacity: 1 } : {};

  return {
    predicatedPosition,
    predicatedScale,
  };
};
