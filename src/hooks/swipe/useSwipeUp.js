import { useSwipeStates } from "./useSwipeStates";
import { useNavToWriteCard } from "../../screens/cards/write-chapter/useNavToWriteCard";
import { useReachMaxAlert } from "./useReachMaxAlert";

export const useSwipeUp = swipe => {
  const {
    categories,
    chapters,

    depth,
    coords,
    maxCoords,

    fetchChapterD1,
    fetchChapterAfter,

    increaseDepth,

    increaseCoords,
    decreaseCoords,

    setMaxCoords,
    setMaxChapterFromCategory,
  } = useSwipeStates();

  const navToWriteCard = useNavToWriteCard();
  const AlertMaxReach = useReachMaxAlert(swipe, "down");

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;
  const { category: maxCategoryCoord, chapter: maxChapterCoord } = maxCoords;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          if (d0 === maxCategoryCoord - 1) {
            AlertMaxReach();
            return;
          }

          swipe("up", () => {
            increaseCoords(depth);
            setMaxChapterFromCategory();
            fetchChapterAfter(2);
          });
        };

      case 1:
        return state => {
          if (d1 === maxChapterCoord) {
            AlertMaxReach();
            return;
          }

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
            fetchChapterAfter(2);
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
            fetchChapterAfter(4);
          });
        };

      case 3:
        return state => {
          if (d3 === maxChapterCoord) {
            console.log("해당 카드가 마지막 챕터입니다!");
            swipe("down", () => {});
            return;
          }

          if (d3 + 1 === chapters[d0][d1].child[d2].child.length) {
            console.log("마지막인 유저 다음 챕터! 새로운 카드 작성");
            navToWriteCard("up");
            return;
          }

          swipe("up", () => {
            increaseCoords(depth);
            fetchChapterAfter(4);
          });
        };

      case 4:
        return state => {
          if (d4 === maxChapterCoord) {
            console.log("해당 카드가 마지막 챕터입니다!");
            return;
          }

          swipe("up", () => {
            increaseDepth();
            console.log("[+] Depth: 4 -> 5");
            fetchChapterAfter(6);
          });
        };

      case 5:
        return state => {
          swipe("up", () => {
            increaseCoords(depth);
            fetchChapterAfter(4);
          });
        };

      case 6:
        return state => {
          swipe("up", () => {
            increaseDepth();
            console.log("[+] Depth: 6 -> 7");
            fetchChapterAfter(8);
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
