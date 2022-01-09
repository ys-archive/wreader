import { useStoreActions, useStoreState } from "easy-peasy";
import { Alert } from "../../components";
import { actSwiper } from "../../store/actions";

export const useReachMaxAlert = (swipe, direction) => {
  const depth = useStoreState(selSwiper.depth);
  const decreaseCoords = useStoreActions(actSwiper.decreaseCoords);

  const cardKind = depth === 0 ? "카테고리" : "챕터";
  return () =>
    Alert(
      `최대 가능한 ${cardKind} 입니다.`,
      `이전 ${cardKind} 로 돌아가기`,
      () =>
        swipe(direction, () => {
          console.log(`최대 가능한 ${cardKind}, 이전 ${cardKind} 로 돌아가기`);
          decreaseCoords(`d${depth}`);
        }),
    );
};
