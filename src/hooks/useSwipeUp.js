import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../navigators/ScreenNames';

export const useSwipeUp = forceSwipeVertically => {
  const {
    categories,
    chapters,
    isLoaded,

    depth,
    coords,
    maxCoords,

    setDepth,
    increaseDepth,
    decreaseDepth,

    setCoords,
    setMaxCoords,
    increaseCoords,
    decreaseCoords,
  } = useSwipeStates();
  const nav = useNavigation();
  if (!isLoaded) return null;

  return () => {
    const shared = () => {
      console.log('swipe to up');
      forceSwipeVertically('up');
    };

    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return state => {
          if (coords.d0 === maxCoords.d0 - 1) {
            if (maxCoords.d0 !== 0) {
              console.log('마지막 카테고리!, 이전 카드로 돌아감!');
              decreaseCoords('d0');
            } else {
              console.log(
                '마지막 카테고리!, 첫 카테고리라 이전으로 돌아가진 않음',
              );
            }
            return;
          }

          increaseCoords('d0');

          shared();
        };

      case DEPTH_NAME.CHAPTER:
        return state => {
          // 현재 카테고리의 현재 챕터의 유저 챕터
          if (chapters[coords.d0][coords.d1].child.length === 0) {
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[coords.d0].title,
              categoryId: coords.d0,
              chapterId: +chapters[coords.d0][coords.d1].deck.id,
            });
            return;
          }

          increaseDepth();
          setMaxCoords({ d2: chapters });

          shared();
        };

      case DEPTH_NAME.USER_CHAPTER:
        return state => {
          if (maxCoords.d2 !== 0 && coords.d2 === maxCoords.d2 - 1) {
            console.log(
              '해당 챕터의 유저 챕터가 존재 하지 않음. 새로운 카드 작성',
            );
            // todo: 새 카드 작성
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[coords.d0].title,
              categoryId: coords.d0,
              chapterId:
                +chapters[coords.d0][coords.d1].deck.id,
            });
            return;
          }

          increaseCoords('d2');

          shared();
        };

      case DEPTH_NAME.NEXT:
        return state => {
          console.log('유저 다음 카드에서는 위로 스와이프 금지');
        };

      default:
        throw new Error('depth 는 0~3 사이만 가능 depth: ', depth);
    }

    // if (
    //   lastCandidateIdx !== 0 &&
    //   currentCandidateIdx + 1 === lastCandidateIdx
    // ) {
    //   setTimeout(() => {
    //     console.log('새 카드 작성 후 위치 복귀');
    //     forceSwipeVertically('down');
    //     swipeToDown();
    //   }, 1000);
    // }
  };
};
