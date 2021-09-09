import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';

export const useSwipeDown = forceSwipeVertically => {
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
  if (!isLoaded) return null;

  return () => {
    const shared = () => {
      console.log('swipe to down');
      forceSwipeVertically('down');
    };

    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return state => {
          if (coords.d0 === 0) {
            console.log('첫 카테고리에서 윗 카드가 없음');
            return;
          }

          decreaseCoords('d0');
          setMaxCoords({ d1: chapters });

          shared();
        };

      case DEPTH_NAME.CHAPTER:
        return state => {
          console.log('챕터에서는 하방 스와이프는 허용되지 않음');
        };

      case DEPTH_NAME.USER_CHAPTER:
        return state => {
          if (coords.d2 === 0) {
            decreaseDepth();
            return;
          }

          decreaseCoords('d2');
          setMaxCoords({ d3: chapters });
          
          shared();
        };

      case DEPTH_NAME.NEXT:
        return state => {
          console.log('유저 다음 카드에서는 아래로 스와이프 금지');
        };

      default:
        throw new Error('depth 는 0~3 사이만 가능 depth: ', depth);
    }
  };
};
