import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const useChapterCardExposer_Chapter = (
  isMovingChapterLock,
  isNextChapter,
  isPreviousChapter,
) => {
  const predicatedPositionBetweenChapters =
    !isMovingChapterLock &&
    isNextChapter //|| isVisibleFromCategory
      ? {
          position: 'absolute',
          left: '-5%',
        }
      : isPreviousChapter
      ? {
          position: 'absolute',
          right: '-5%',
        }
      : {};

  const predicatedScaleBGBetweenChapters =
    isNextChapter || isPreviousChapter // || isVisibleFromCategory
      ? {
          width: wp('83.3%') * 0.9,
          height: hp('81.2%') * 0.9,
        }
      : {};

  const predicatedScaleProfileBetweenChapters =
    isNextChapter || isPreviousChapter // || isVisibleFromCategory
      ? {
          width: 30 * 0.9,
          height: 30 * 0.9,
        }
      : {};

  const predicatedScaleInsideBGBetweenChapters =
    isNextChapter || isPreviousChapter // || isVisibleFromCategory
      ? {
          width: wp('75.6%') * 0.9,
          height: hp('69.7%') * 0.9,
        }
      : {};

  const predicatedScaleBottomSectionBetweenChapters =
    isNextChapter || isPreviousChapter //|| isVisibleFromCategory
      ? {
          minWidth: wp('75.6%') * 0.9,
          minHeight: 72.2 * 0.9,
        }
      : {};

  return {
    predicatedPositionBetweenChapters,
    predicatedScaleBGBetweenChapters,
    predicatedScaleProfileBetweenChapters,
    predicatedScaleInsideBGBetweenChapters,
    predicatedScaleBottomSectionBetweenChapters,
  };
};
