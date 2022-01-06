import { useSwipeStates } from "./useSwipeStates";
import { useNavigation } from "@react-navigation/native";
import * as ScreenNames from "../../navigators/ScreenNames";

export const useSwipeLeft = swipe => {
  const {
    categories,
    chapters,
    isLoaded,

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

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;
  const { category, chapter } = maxCoords;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          // 현재 카테고리의 챕터
          if (!chapters[d0]) {
            swipe("left", () => {
              console.log(
                "마지막 챕터!, 더이상 다음 챕터가 없어서 새 챕터 작성!",
              );
              resetTempBlob();
              resetCard();
              nav.navigate(ScreenNames.MainWriteCard, {
                categoryTitle: categories[d0].title,
                categoryId: d0,
                chapterId: 0,
                order: d1 + 1,
                depth: 1,
              });
            });
            return;
          }

          swipe("left", () => {
            // 카테고리 -> 챕터 선택 (d0 -> d1)
            increaseDepth();
            // 각 챕터에 맞게 최대 챕터 설정 (d1)
            console.log("ENTER INTO D1");
            // updateHasNew({ d2: true });
          });
        };

      case 1:
        return state => {
          // 현재 카테고리의 현재 챕터의 유저 챕터
          if (chapters[d0][d1].child.length === 0) {
            resetCard();
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[d0].title,
              categoryId: d0,
              chapterId: +chapters[d0][d1].deck.id,
              order: d2 + 2,
              depth: 2,
            });
            return;
          }

          swipe("left", () => {
            increaseDepth();
            console.log("ENTER INTO D2");
            updateHasNew({ d3: true });
          });
        };

      case 2:
        return state => {
          if (chapter !== 0 && d2 === chapter - 1) {
            console.log(
              "해당 챕터의 유저 챕터가 존재 하지 않음. 새로운 카드 작성",
            );

            resetCard();
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[d0].title,
              categoryId: d0,
              chapterId: +chapters[d0][d1].deck.id,
              order: d2 + 2 + 1,
              depth: 2,
            });
            return;
          }

          swipe("left", () => {
            increaseCoords("d2");
            updateHasNew({ d3: true });
          });
        };

      case 3:
        return state => {
          if (d3 === chapter) {
            console.log("해당 카드가 마지막 챕터입니다!");
            return;
          }

          if (d3 === chapter - 1) {
            if (chapter === 10) {
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
              categoryTitle: categories[d0].title,
              categoryId: +d0,
              chapterId: +chapters[d0][d1].child[d2].deck.id,
              order: d3 + 2 + d1,
              depth: 3,
            });
            return;
          }

          swipe("left", () => {
            increaseCoords("d3");
          });
        };

      default:
        throw new Error("depth 는 0~9 사이만 가능 depth: ", depth);
    }
  };
};
