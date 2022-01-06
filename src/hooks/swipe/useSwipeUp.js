import { DEPTH_NAME } from "../../store/reducers/swiper.depth";
import { Alert } from "../../components/alert";
import { useSwipeStates } from "./useSwipeStates";
import { useNavigation } from "@react-navigation/native";
import * as ScreenNames from "../../navigators/ScreenNames";

export const useSwipeUp = swipe => {
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
          if (d0 === category - 1) {
            if (category !== 0) {
              Alert("마지막 카테고리입니다!", "이전 카테고리로 돌아가기F", () =>
                swipe("down", () => {
                  console.log("마지막 카테고리!, 이전 카드로 돌아감!");
                  decreaseCoords("d0");
                }),
              );
            } else {
              console.log(
                "마지막 카테고리!, 첫 카테고리라 이전으로 돌아가진 않음",
              );
            }
            return;
          }

          swipe("up", () => {
            increaseCoords("d0");
            setMaxCoords({ d1: categories[d0].maxLength });
            updateHasNew({ d2: chapters });
          });
        };

      case 1:
        return state => {
          if (d1 === chapter - 1 && d1 > 0) {
            swipe("down", () => {
              console.log("마지막 챕터!, 이전 챕터로 돌아감");
              decreaseCoords("d1");
            });
            return;
          }

          if (d1 < chapter - 2 && d1 + 1 === chapters[d0].length) {
            swipe("up", () => {
              console.log(
                "마지막 챕터!, 더이상 다음 챕터가 없어서 새 챕터 작성!",
              );
              resetTempBlob();
              resetCard();
              nav.navigate(ScreenNames.MainWriteCard, {
                categoryTitle: categories[d0].title,
                categoryId: d0,
                chapterId: 0,
                order: 1,
                depth: 1,
              });
            });
            return;
          }

          swipe("up", () => {
            increaseCoords("d1");
            updateHasNew({ d2: true });
          });
        };

      case 2:
        return state => {
          if (chapters[d0][d1].child[d2].child.length === 0) {
            console.log(
              "해당 유저챕터의 유저 다음 챕터가 존재 하지 않음. 새로운 카드 작성",
            );
            resetTempBlob();
            resetCard();
            nav.navigate(ScreenNames.MainWriteCard, {
              categoryTitle: categories[d0].title,
              categoryId: d0,
              chapterId: +chapters[d0][d1].child[d2].deck.id,
              order: d2 + 2,
              depth: 3,
            });
            return;
          }

          swipe("up", () => {
            increaseDepth();
            updateHasNew({ d4: true });
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
              swipe("down", () => {
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
              order: d2 + 2,
              depth: 3,
            });
            return;
          }

          swipe("up", () => {
            increaseCoords("d3");
            console.log("Depth: 2 -> 3");
            updateHasNew({ d4: true });
          });
        };

      case 4:
        return state => {
          // console.log("Depth: 4 -> 5");
        };

      case 5:
        return state => {};

      case 6:
        return state => {
          // console.log("Depth: 6 -> 7");
        };

      case 7:
        return state => {};

      case 8:
        return state => {
          // console.log("Depth: 8 -> 9");
        };

      case 9:
        return state => {};
    }
  };
};
