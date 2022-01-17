import { Alert } from "../../components/alert";
import { useSwipeStates } from "./useSwipeStates";

export const useSwipeDown = swipe => {
  const {
    categories,
    chapters,
    isLoaded,

    depth,
    coords,

    decreaseDepth,

    setMaxCoords,
    setMaxChapterFromCategory,
    decreaseCoords,
  } = useSwipeStates();

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          if (d0 === 0) {
            Alert("첫 카테고리 입니다. 더 이상 카드가 없습니다.", "게속하기");
            console.log("첫 카테고리에서 윗 카드가 없음");
            return;
          }

          swipe("down", () => {
            decreaseCoords(depth);
            setMaxChapterFromCategory();
          });
        };

      case 1:
        return state => {
          if (d1 > 0) {
            swipe("down", () => {
              decreaseCoords(depth);
            });
          }
        };

      case 2:
        return state => {
          console.log("depth 2: 아래측 스와이프(위로 이동)는 허용되지 않음.");
        };

      case 3:
        return state => {
          if (d3 === 0) {
            swipe("down", () => {
              console.log("[-] Depth: 3 -> 2");
              decreaseDepth();
            });
            return;
          }

          if (d3 > 0) {
            swipe("down", () => {
              decreaseCoords(depth);
            });
          }
        };

      case 4:
        return state => {
          console.log("depth 4: 아래측 스와이프(위로 이동)는 허용되지 않음.");
        };

      case 5:
        return state => {
          if (d5 === 0) {
            swipe("down", () => {
              console.log("[-] Depth: 5 -> 4");
              decreaseDepth();
            });
            return;
          }

          if (d5 > 0) {
            swipe("down", () => {
              decreaseCoords(depth);
            });
          }
        };

      case 6:
        return state => {
          console.log("depth 6: 아래측 스와이프(위로 이동)는 허용되지 않음.");
        };

      case 7:
        return state => {
          if (d7 === 0) {
            swipe("down", () => {
              console.log("[-] Depth: 7 -> 6");
              decreaseDepth();
            });
            return;
          }

          if (d7 > 0) {
            swipe("down", () => {
              decreaseCoords(depth);
            });
          }
        };

      case 8:
        return state => {
          console.log("depth 8: 아래측 스와이프(위로 이동)는 허용되지 않음.");
        };

      case 9:
        return state => {
          if (d9 === 0) {
            swipe("down", () => {
              console.log("[-] Depth: 9 -> 8");
              decreaseDepth();
            });
            return;
          }

          if (d9 > 0) {
            swipe("down", () => {
              decreaseCoords(depth);
            });
          }
        };
    }
  };
};
