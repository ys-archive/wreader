import { DEPTH_NAME } from "../../store/reducers/swiper.depth";
import { useSwipeStates } from "./useSwipeStates";

export const useSwipeRight = swipe => {
  const {
    chapters,
    isLoaded,

    depth,
    coords,

    decreaseDepth,

    updateHasNew,
    setMaxCoords,
    decreaseCoords,
  } = useSwipeStates();

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          console.log("카테고리에서 우측 스와이프는 허용되지 않음.");
        };

      case 1:
        return state => {
          if (d1 === 0) {
            swipe("right", () => {
              console.log("Depth: 1 -> 0");
              decreaseDepth();
            });
          }

          // if (d1 > 0) {
          //   swipe("right", () => {
          //     decreaseCoords("d1");
          //   });
          // }
        };

      case 2:
        return state => {
          if (d2 === 0) {
            swipe("right", () => {
              console.log("Depth: 2 -> 1");
              decreaseDepth();
            });
            return;
          }

          swipe("right", () => {
            decreaseCoords("d2");
            updateHasNew({ d3: true });
          });
        };

      case 3:
        return state => {
          // if (d3 === 0) {
          //   swipe("right", () => {
          //     decreaseDepth()
          //   })
          // }

          if (d3 > 0) {
            swipe("right", () => {
              decreaseCoords("d3");
            });
          }
        };

      case 4:
        return state => {
          swipe("right", () => {
            console.log("Depth: 4 -> 3");
            decreaseDepth();
          });
        };

      case 5:
        return state => {};

      case 6:
        return state => {
          swipe("right", () => {
            console.log("Depth: 6 -> 5");
            decreaseDepth();
          });
        };

      case 7:
        return state => {};

      case 8:
        return state => {
          swipe("right", () => {
            console.log("Depth: 8 -> 7");
            decreaseDepth();
          });
        };

      case 9:
        return state => {};
    }
  };
};
