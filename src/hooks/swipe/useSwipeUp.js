import { DEPTH_NAME } from '../../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../navigators/ScreenNames';

export const useSwipeUp = swipe => {
  const {
    categories,
    chapters,
    isLoaded,

    depth,
    coords,
    maxCoords,

    increaseDepth,

    setMaxCoords,

    updateHasNew,
    increaseCoords,
    decreaseCoords,
  } = useSwipeStates();
  const nav = useNavigation();
  if (!isLoaded) return null;

  return () => {
    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return state => {
          if (coords.d0 === maxCoords.d0 - 1) {
            if (maxCoords.d0 !== 0) {
              swipe('down', () => {
                console.log('마지막 카테고리!, 이전 카드로 돌아감!');
                decreaseCoords('d0');
              });
            } else {
              console.log(
                '마지막 카테고리!, 첫 카테고리라 이전으로 돌아가진 않음',
              );
            }
            return;
          }

          swipe('up', () => {
            increaseCoords('d0');
            // setMaxCoords({ d1: chapters });
            setMaxCoords({ d1: categories[coords.d0].maxLength });
            if (coords.d0 < 2) {
              updateHasNew({ d2: chapters });
            }
          });
        };

      case DEPTH_NAME.CHAPTER:
        return state => {
          // 현재 카테고리의 현재 챕터의 유저 챕터
          if (chapters[coords.d0][coords.d1].child.length === 0) {
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[coords.d0].title,
              categoryId: coords.d0,
              chapterId: +chapters[coords.d0][coords.d1].deck.id,
              order: coords.d1,
              depth: DEPTH_NAME.USER_CHAPTER,
            });
            return;
          }

          swipe('up', () => {
            increaseDepth();
            console.log('ENTER INTO USER CHAPTERS');
            updateHasNew({ d3: true });
          });
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
              chapterId: +chapters[coords.d0][coords.d1].deck.id,
              order: coords.d1 + 1,
              depth: DEPTH_NAME.USER_CHAPTER,
            });
            return;
          }

          swipe('up', () => {
            increaseCoords('d2');
            updateHasNew({ d3: true });
            setMaxCoords({ d3: chapters });
          });
        };

      case DEPTH_NAME.NEXT:
        return state => {
          console.log('유저 다음 카드에서는 위로 스와이프 금지');
        };

      default:
        throw new Error('depth 는 0~3 사이만 가능 depth: ', depth);
    }
  };
};
