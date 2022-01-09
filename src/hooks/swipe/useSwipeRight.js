import { DEPTH_NAME } from "../../store/reducers/swiper.depth";
import { useSwipeStates } from "./useSwipeStates";

export const useSwipeRight = swipe => {
  const {
    depth,
    coords,

    decreaseDepth,

    updateHasNew,
    decreaseCoords,
  } = useSwipeStates();

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;
  const { category, chapter } = maxCoords;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          console.log("depth 0: 우측 스와이프(좌로 이동)는 허용되지 않음.");
        };

      case 1:
        return state => {
          if (d1 === 0 || d1 === chapter) {
            swipe("right", () => {
              console.log("[-] Depth: 1 -> 0");
              decreaseDepth();
            });
          }
        };

      case 2:
        return state => {
          if (d2 === 0 || d2 === chapter) {
            swipe("right", () => {
              console.log("[-] Depth: 2 -> 1");
              decreaseDepth();
            });
            return;
          }

          swipe("right", () => {
            decreaseCoords(depth);
            updateHasNew({ d3: true });
          });
        };

      case 3:
        return state => {
          console.log("depth 3: 우측 스와이프(좌로 이동)는 허용되지 않음.");
        };

      case 4:
        return state => {
          if (d4 === 0) {
            swipe("right", () => {
              console.log("[-] Depth: 4 -> 3");
              decreaseDepth();
            });
            return;
          }

          swipe("right", () => {
            decreaseCoords(depth);
            updateHasNew({ d5: true });
          });
        };

      case 5:
        return state => {
          console.log("depth 5: 우측 스와이프(좌로 이동)는 허용되지 않음.");
        };

      case 6:
        return state => {
          if (d6 === 0) {
            swipe("right", () => {
              console.log("[-] Depth: 6 -> 5");
              decreaseDepth();
            });
          }

          swipe("right", () => {
            decreaseCoords(depth);
            updateHasNew({ d7: true });
          });
        };

      case 7:
        return state => {
          console.log("depth 7: 우측 스와이프(좌로 이동)는 허용되지 않음.");
        };

      case 8:
        return state => {
          if (d8 === 0) {
            swipe("right", () => {
              console.log("[-] Depth: 8 -> 7");
              decreaseDepth();
            });
          }

          swipe("right", () => {
            decreaseCoords(depth);
            updateHasNew({ d9: true });
          });
        };

      case 9:
        return state => {
          console.log("depth 9: 우측 스와이프(좌로 이동)는 허용되지 않음.");
        };
    }
  };
};
