import { useSwipeStates } from "./useSwipeStates";
import { useNavToWriteCard } from "../../screens/cards/write-chapter/useNavToWriteCard";
import { useReachMaxAlert } from "./useReachMaxAlert";

export const useSwipeLeft = swipe => {
  const {
    chapters,

    depth,
    coords,
    maxCoords,

    updateHasNew,
    increaseDepth,

    increaseCoords,
  } = useSwipeStates();

  const navToWriteCard = useNavToWriteCard();
  // const AlertMaxReach = useReachMaxAlert(swipe, "right");

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;
  const { category, chapter } = maxCoords;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          if (!chapters[d0]) {
            // 현재 카테고리의 챕터
            swipe("left", () => {
              console.log(
                "카테고리에 챕터가 없습니다! 더 이상 다음 챕터가 없어서 새 챕터 작성!",
              );
              navToWriteCard("left");
            });
            return;
          }

          swipe("left", () => {
            increaseDepth();
            console.log("Depth 0 -> 1");
            updateHasNew({ d2: true });
          });
        };

      case 1:
        return state => {
          // 현재 카테고리의 현재 챕터의 유저 챕터
          if (chapters[d0][d1].child.length === 0) {
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseDepth();
            console.log("[+] Depth: 1 -> 2");
            updateHasNew({ d3: true });
          });
        };

      case 2:
        return state => {
          if (chapter !== 0 && d2 === chapter - 1) {
            console.log(
              "해당 챕터의 유저 챕터가 존재 하지 않음. 새로운 카드 작성",
            );
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseCoords(depth);
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
            console.log("마지막인 유저 다음 챕터! 새로운 카드 작성");
            navToWriteCard();
            return;
          }

          swipe("left", () => {
            increaseDepth();
            console.log("[+] Depth: 3 -> 4");
            updateHasNew({ d5: true });
          });
        };

      case 4:
        return state => {};

      case 5:
        return state => {
          swipe("left", () => {
            increaseDepth();
            console.log("[+] Depth: 5 -> 6");
            updateHasNew({ d7: true });
          });
        };

      case 6:
        return state => {};

      case 7:
        return state => {
          swipe("left", () => {
            increaseDepth();
            console.log("[+] Depth: 7 -> 8");
            updateHasNew({ d9: true });
          });
        };

      case 8:
        return state => {};

      case 9:
        return state => {
          // console.log("Last");
        };
    }
  };
};
