import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../navigators/ScreenNames';

export const useSwipeLeft = forceSwipeHorizontally => {
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
      console.log('swipe to left');
      forceSwipeHorizontally('left');
    };

    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return state => {
          // 현재 카테고리의 챕터
          if (!chapters[coords.d0].length === 0) {
            console.log('해당 카테고리의 챕터가 존재하지 않음');
            return;
          }

          increaseDepth();
          setMaxCoords({ d1: chapters });

          shared();
        };

      case DEPTH_NAME.CHAPTER:
        return state => {
          if (coords.d1 === maxCoords.d1 - 1) {
            if (coords.d1 > 0) {
              console.log('마지막 챕터!, 이전 챕터로 돌아감');
              decreaseCoords('d1');
              return;
            }

            if (maxCoords.d1 < 10) {
              console.log(
                '마지막 챕터!, 더이상 다음 챕터가 없어서 새 챕터 작성!',
              );
              // todo: 새 챕터 작성
              nav.navigate(ScreenNames.MainWriteCard, {
                categoryTitle: categories[coords.d0].title,
                categoryId: coords.d0,
                chapterId: 0,
              });
              return;
            }

            return;
          }

          increaseCoords('d1');

          shared();
        };

      case DEPTH_NAME.USER_CHAPTER:
        return state => {
          if (
            chapters[coords.d0][coords.d1].child[coords.d2].child.length === 0
          ) {
            console.log(
              '해당 유저챕터의 다음 챕터가 존재 하지 않음. 새로운 카드 작성',
            );
            // todo: 새 챕터 작성
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[coords.d0].title,
              categoryId: coords.d0,
              chapterId:
              +chapters[coords.d0][coords.d1].child[coords.d2].deck.id,
            });
            return;
          }

          increaseDepth();
          setMaxCoords({ d3: chapters });

          shared();
        };

      case DEPTH_NAME.NEXT:
        return state => {
          if (coords.d3 === maxCoords.d3 - 1) {
            if (maxCoords.d3 === 10) {
              console.log('마지막인 유저 다음 챕터!, 이전 챕터로 돌아감');
              decreaseCoords('d3');
              return;
            }

            console.log('마지막인 유저 다음 챕터! 새로운 카드 작성');
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[coords.d0].title,
              categoryId: +coords.d0,
              chapterId:
                +chapters[coords.d0][coords.d1].child[coords.d2].deck.id,
            });
            return;
          }

          increaseCoords('d3');
          shared();
        };

      default:
        throw new Error('depth 는 0~3 사이만 가능 depth: ', depth);
    }
  };
};
