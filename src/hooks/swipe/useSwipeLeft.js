import { useSwipeStates } from "./useSwipeStates";
import { useNavToWriteCard } from "../../screens/cards/write-chapter/useNavToWriteCard";
import { useReachMaxAlert } from "./useReachMaxAlert";
import { Alert } from "../../components";

export const useSwipeLeft = swipe => {
  const {
    chapters,

    depth,
    coords,
    maxCoords,

    fetchChapterAfter,

    increaseDepth,
    increaseCoords,
  } = useSwipeStates();

  const navToWriteCard = useNavToWriteCard();
  const AlertMaxReach = useReachMaxAlert(swipe, "right");

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;
  const { category: maxCategoryCoord, chapter: maxChapterCoord } = maxCoords;

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
            fetchChapterAfter(2);
          });
        };

      case 1:
        return state => {
          if (d1 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          // 현재 카테고리의 현재 챕터의 유저 챕터
          if (chapters[d0][d1].child.length === 0) {
            swipe("left", () => {
              console.log("d2(다음 depth) 에 챕터가 없습니다! 새 챕터 작성");
              navToWriteCard("left");
            });
            return;
          }

          swipe("left", () => {
            increaseDepth();
            console.log("[+] Depth: 1 -> 2");
            fetchChapterAfter(3);
          });
        };

      case 2:
        return state => {
          if (d2 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          if (d2 + 1 === chapters[d0][d1].child.length) {
            console.log("d2 에 챕터가 없습니다. 새 챕터 작성");
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseCoords(depth);
            fetchChapterAfter(3);
          });
        };

      case 3:
        return state => {
          if (d3 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          if (chapters[d0][d1].child[d2].child[d3].child.length === 0) {
            console.log("d4(다음 depth) 에 챕터가 없습니다. 새 챕터 작성");
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseDepth();
            console.log("[+] Depth: 3 -> 4");
            fetchChapterAfter(5);
          });
        };

      case 4:
        return state => {
          if (d4 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          if (d4 + 1 === chapters[d0][d1].child[d2].child[d3].child.length) {
            console.log("d4 에 챕터가 없습니다. 새 챕터 작성");
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseCoords(depth);
            fetchChapterAfter(5);
          });
        };

      case 5:
        return state => {
          if (d5 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          if (
            chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child
              .length === 0
          ) {
            console.log("d6(다음 depth) 에 챕터가 없습니다. 새 챕터 작성");
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseDepth();
            console.log("[+] Depth: 5 -> 6");
            fetchChapterAfter(7);
          });
        };

      case 6:
        return state => {
          if (d6 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          if (
            d6 + 1 ===
            chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child
              .length
          ) {
            console.log("d6 에 챕터가 없습니다. 새 챕터 작성");
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseCoords(depth);
            fetchChapterAfter(7);
          });
        };

      case 7:
        return state => {
          if (d7 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          if (
            chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
              .child[d7].child.length === 0
          ) {
            console.log("d8(다음 depth) 에 챕터가 없습니다. 새 챕터 작성");
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseDepth();
            console.log("[+] Depth: 7 -> 8");
            fetchChapterAfter(8);
          });
        };

      case 8:
        return state => {
          if (d8 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          if (
            d8 + 1 ===
            chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
              .child[d7].child.length
          ) {
            console.log("d8 에 챕터가 없습니다. 새 챕터 작성");
            navToWriteCard("left");
            return;
          }

          swipe("left", () => {
            increaseCoords(depth);
            fetchChapterAfter(9);
          });
        };

      case 9:
        return state => {
          if (d9 === maxChapterCoord - 1) {
            AlertMaxReach();
            return;
          }

          Alert("10 단 카드가 마지막입니다.", "돌아가기");

          // todo: 10 단계가 아직 마지막
          // if (
          //   chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
          //     .child[d7].child[d8].child.length === 0
          // ) {
          //   console.log("d8(다음 depth) 에 챕터가 없습니다. 새 챕터 작성");
          //   navToWriteCard("left");
          //   return;
          // }

          // swipe("left", () => {
          //   increaseDepth();
          //   console.log("[+] Depth: 7 -> 8");
          //   fetchChapterAfter(8);
          // });
        };
    }
  };
};
