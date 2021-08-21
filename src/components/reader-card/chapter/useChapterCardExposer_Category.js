export const useChapterCardExposer_Category = (
  isNextCandidate,
  isPreviousCandidate,
  candidateIdx,
  isMovingChapterLock,
) => {
  const predicatedPositionBetweenCandidates = isNextCandidate
    ? {
        position: 'absolute',
        top: '-5%',
      } 
    : (candidateIdx === -1 && isMovingChapterLock) || isPreviousCandidate
    ? {
        position: 'absolute',
        bottom: '-7%',
      }
    : {};

  // : isVisibleFromCategory
  // ? {
  //     position: 'absolute',
  //     left: '-5%',
  //   }
  // : {};
  // const predicatedScaleBGBetweenCandidates =
  //   isNextChapter || isPreviousChapter || isVisibleFromCategory
  //     ? {
  //         width: wp('83.3%') * 0.9,
  //         height: hp('81.2%') * 0.9,
  //       }
  //     : {};

  // const predicatedScaleProfileBetweenCandidates =
  //   isNextChapter || isPreviousChapter || isVisibleFromCategory
  //     ? {
  //         width: 30 * 0.9,
  //         height: 30 * 0.9,
  //       }
  //     : {};

  // const predicatedScaleInsideBGBetweenCandidates =
  //   isNextChapter || isPreviousChapter || isVisibleFromCategory
  //     ? {
  //         width: wp('75.6%') * 0.9,
  //         height: hp('69.7%') * 0.9,
  //       }
  //     : {};

  // const predicatedScaleBottomSectionBetweenCandidates =
  //   isNextChapter || isPreviousChapter || isVisibleFromCategory
  //     ? {
  //         minWidth: wp('75.6%') * 0.9,
  //         minHeight: 72.2 * 0.9,
  //       }
  //     : {};

  return {
    predicatedPositionBetweenCandidates,
  };
};
