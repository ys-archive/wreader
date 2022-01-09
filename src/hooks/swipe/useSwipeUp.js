import { DEPTH_NAME } from "../../store/reducers/swiper.depth";
import { Alert } from "../../components/alert";
import { useSwipeStates } from "./useSwipeStates";
import { useNavigation } from "@react-navigation/native";
import * as ScreenNames from "../../navigators/ScreenNames";
import { useNavToWriteCard } from "../../screens/cards/write-chapter/useNavToWriteCard";
import { useReachMaxAlert } from "./useReachMaxAlert";

export const useSwipeUp = swipe => {
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
  } = useSwipeStates();

  const navToWriteCard = useNavToWriteCard();
  const AlertMaxReach = useReachMaxAlert(swipe, "down");

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;
  const { category, chapter } = maxCoords;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          if (d0 === category - 1) {
            AlertMaxReach();
            return;
          }

          swipe("up", () => {
            increaseCoords(depth);
            setMaxCoords({ d1: categories[d0].maxLength });
            updateHasNew({ d2: chapters });
          });
        };

      case 1:
        return state => {
          if (d1 === chapter) {
            AlertMaxReach();
            return;
          }

          if (chapters[d0] && d1 > 0) {
            swipe("down", () => {
              console.log("마지막 챕터!, 이전 챕터로 돌아감");
              decreaseCoords(depth);
            });
            return;
          }

          // d1 < chapter - 2 &&
          if (d1 + 1 === chapters[d0].length) {
            swipe("up", () => {
              console.log(
                "마지막 챕터!, 더이상 다음 챕터가 없어서 새 챕터 작성!",
              );
              navToWriteCard("up");
            });
            return;
          }

          swipe("up", () => {
            increaseCoords(depth);
            updateHasNew({ d2: true });
          });
        };

      case 2:
        return state => {
          if (chapters[d0][d1].child[d2].child.length === 0) {
            console.log(
              "해당 유저챕터의 유저 다음 챕터가 존재 하지 않음. 새로운 카드 작성",
            );
            navToWriteCard("up");
            return;
          }

          swipe("up", () => {
            increaseDepth();
            console.log("[+] Depth: 2 -> 3");
            updateHasNew({ d4: true });
          });
        };

      case 3:
        return state => {
          if (d3 === chapter) {
            console.log("해당 카드가 마지막 챕터입니다!");
            swipe("down", () => {});
            return;
          }

          if (d3 === chapter - 1) {
            console.log("마지막인 유저 다음 챕터! 새로운 카드 작성");
            navToWriteCard("up");
            return;
          }

          swipe("up", () => {
            updateHasNew({ d4: true });
          });
        };

      case 4:
        return state => {
          if (d4 === chapter) {
            console.log("해당 카드가 마지막 챕터입니다!");
            return;
          }

          swipe("up", () => {
            increaseDepth();
            console.log("[+] Depth: 4 -> 5");
            updateHasNew({ d6: true });
          });
        };

      case 5:
        return state => {};

      case 6:
        return state => {
          swipe("up", () => {
            increaseDepth();
            console.log("[+] Depth: 6 -> 7");
            updateHasNew({ d8: true });
          });
        };

      case 7:
        return state => {};

      case 8:
        return state => {
          swipe("up", () => {
            increaseDepth();
            console.log("[+] Depth: 8 -> 9");
            console.log("Max Depth (9) Reached!");
          });
        };

      case 9:
        return state => {};
    }
  };
};
