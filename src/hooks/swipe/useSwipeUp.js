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

  if (!isLoaded) return null;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          if (coords.d0 === maxCoords.d0 - 1) {
            if (maxCoords.d0 !== 0) {
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
            setMaxCoords({ d1: categories[coords.d0].maxLength });
            updateHasNew({ d2: chapters });
          });
        };

      case 1:
        return state => {
          if (coords.d1 === maxCoords.d1 - 1 && coords.d1 > 0) {
            swipe("down", () => {
              console.log("마지막 챕터!, 이전 챕터로 돌아감");
              decreaseCoords("d1");
            });
            return;
          }

          if (
            coords.d1 < maxCoords.d1 - 2 &&
            coords.d1 + 1 === chapters[coords.d0].length
          ) {
            swipe("up", () => {
              console.log(
                "마지막 챕터!, 더이상 다음 챕터가 없어서 새 챕터 작성!",
              );
              resetTempBlob();
              resetCard();
              nav.navigate(ScreenNames.MainWriteCard, {
                categoryTitle: categories[coords.d0].title,
                categoryId: coords.d0,
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
            // setMaxCoords({ d2: chapters });
          });
        };

      case 2:
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
              order: coords.d2 + 2,
              depth: 3,
            });
            return;
          }

          swipe("up", () => {
            increaseDepth();
            updateHasNew({ d4: true });
            // setMaxCoords({ d3: chapters });
          });
        };

      case 3:
        return state => {
          if (coords.d3 === maxCoords.d1) {
            console.log("해당 카드가 마지막 챕터입니다!");
            return;
          }

          if (coords.d3 === maxCoords.d3 - 1) {
            if (maxCoords.d3 === 10) {
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
              categoryTitle: categories[coords.d0].title,
              categoryId: +coords.d0,
              chapterId:
                +chapters[coords.d0][coords.d1].child[coords.d2].deck.id,
              order: coords.d2 + 2,
              depth: 3,
            });
            return;
          }

          swipe("up", () => {
            increaseCoords("d3");
            updateHasNew({ d4: true });
          });
        };

      case 4:
        return state => {};

      case 5:
        return state => {};

      case 6:
        return state => {};

      case 7:
        return state => {};

      case 8:
        return state => {};

      case 9:
        return state => {};
    }
  };
};
