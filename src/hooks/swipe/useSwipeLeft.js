import { DEPTH_NAME } from "../../store/reducers/swiper.depth";
import { useSwipeStates } from "./useSwipeStates";
import { useNavigation } from "@react-navigation/native";
import * as ScreenNames from "../../navigators/ScreenNames";

export const useSwipeLeft = swipe => {
  const {
    categories,
    chapters,

    depth,
    coords,
    maxCoords,

    updateHasNew,
    increaseDepth,

    increaseCoords,
    decreaseCoords,

    setMaxCoords,
    resetTempBlob,
    resetCard,
  } = useSwipeStates();

  const nav = useNavigation();

  return () => {
    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return state => {
          // 현재 카테고리의 챕터
          if (!chapters[coords.d0]) {
            // console.log('해당 카테고리의 챕터가 존재하지 않음');
            swipe("left", () => {
              console.log(
                "마지막 챕터!, 더이상 다음 챕터가 없어서 새 챕터 작성!",
              );
              resetTempBlob();
              resetCard();
              nav.navigate(ScreenNames.MainWriteCard, {
                categoryTitle: categories[coords.d0].title,
                categoryId: coords.d0,
                chapterId: 0,
                order: coords.d1 + 1,
                depth: DEPTH_NAME.CHAPTER,
              });
            });
            return;
          }

          swipe("left", () => {
            // 카테고리 -> 챕터 선택 (d0 -> d1)
            increaseDepth();
            // 각 챕터에 맞게 최대 챕터 설정 (d1)
            console.log("ENTER INTO CHAPTERS");
            // updateHasNew({ d2: true });
          });
        };

      case DEPTH_NAME.CHAPTER:
        return state => {
          if (coords.d1 === maxCoords.d1 - 1 && coords.d1 > 0) {
            swipe("right", () => {
              console.log("마지막 챕터!, 이전 챕터로 돌아감");
              decreaseCoords("d1");
            });
            return;
          }

          if (
            coords.d1 < maxCoords.d1 - 2 &&
            coords.d1 + 1 === chapters[coords.d0].length
          ) {
            swipe("left", () => {
              console.log(
                "마지막 챕터!, 더이상 다음 챕터가 없어서 새 챕터 작성!",
              );
              resetTempBlob();
              resetCard();
              nav.navigate(ScreenNames.MainWriteCard, {
                categoryTitle: categories[coords.d0].title,
                categoryId: coords.d0,
                chapterId: 0,
                order: coords.d1 + 2,
                depth: DEPTH_NAME.CHAPTER,
              });
            });
            return;
          }

          swipe("left", () => {
            increaseCoords("d1");
            updateHasNew({ d2: true });
            setMaxCoords({ d2: chapters });
          });
        };

      case DEPTH_NAME.USER_CHAPTER:
        return state => {
          if (
            chapters[coords.d0][coords.d1].child[coords.d2].child.length === 0
          ) {
            console.log(
              "해당 유저챕터의 유저 다음 챕터가 존재 하지 않음. 새로운 카드 작성",
            );
            resetTempBlob();
            resetCard();
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[coords.d0].title,
              categoryId: coords.d0,
              chapterId:
                +chapters[coords.d0][coords.d1].child[coords.d2].deck.id,
              order: coords.d3 + 2 + coords.d1,
              depth: DEPTH_NAME.NEXT,
            });
            return;
          }

          swipe("left", () => {
            increaseDepth();
            setMaxCoords({ d3: chapters });
          });
        };

      case DEPTH_NAME.NEXT:
        return state => {
          if (coords.d3 === maxCoords.d1) {
            console.log("해당 카드가 마지막 챕터입니다!");
            return;
          }

          if (coords.d3 === maxCoords.d3 - 1) {
            if (maxCoords.d3 === 10) {
              swipe("right", () => {
                console.log("마지막인 유저 다음 챕터!, 이전 챕터로 돌아감");
                decreaseCoords("d3");
              });
              return;
            }

            console.log("마지막인 유저 다음 챕터! 새로운 카드 작성");
            resetTempBlob();
            resetCard();
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[coords.d0].title,
              categoryId: +coords.d0,
              chapterId:
                +chapters[coords.d0][coords.d1].child[coords.d2].deck.id,
              order: coords.d3 + 2 + coords.d1,
              depth: DEPTH_NAME.NEXT,
            });
            return;
          }

          swipe("left", () => {
            increaseCoords("d3");
          });
        };

      default:
        throw new Error("depth 는 0~3 사이만 가능 depth: ", depth);
    }
  };
};
