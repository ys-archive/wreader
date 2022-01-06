import { Alert } from "../../components/alert";
import { DEPTH_NAME } from "../../store/reducers/swiper.depth";
import { useSwipeStates } from "./useSwipeStates";

export const useSwipeDown = swipe => {
  const {
    categories,
    chapters,
    isLoaded,

    depth,
    coords,

    decreaseDepth,

    updateHasNew,
    setMaxCoords,
    decreaseCoords,
  } = useSwipeStates();
  if (!isLoaded) return null;

  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  return () => {
    switch (depth) {
      case 0:
        return state => {
          if (d0 === 0) {
            Alert("You are at the first category", "continue");
            console.log("첫 카테고리에서 윗 카드가 없음");
            return;
          }

          swipe("down", () => {
            decreaseCoords("d0");
            setMaxCoords({ chapter: categories[d0].maxLength });
          });
        };

      case 1:
        return state => {
          if (d1 === 0) {
            swipe("down", () => {
              decreaseDepth();
            });
          }

          if (d1 > 0) {
            swipe("down", () => {
              decreaseCoords("d1");
            });
          }
        };

      case 2:
        return state => {
          if (d1 === 0) {
            swipe("down", () => {
              decreaseDepth();
              // decreaseDepth();
            });
          }
        };

      case 3:
        return state => {
          if (d3 === 0) {
            swipe("down", () => {
              decreaseDepth();
            });
          }

          if (d3 > 0) {
            swipe("down", () => {
              decreaseCoords("d3");
            });
          }
        };

      case 4:
        return state => {
          if (d3 === 0) {
            swipe("down", () => {
              decreaseDepth();
            });
          }
        };

      case 5:
        return state => {
          if (d5 === 0) {
            swipe("down", () => {
              decreaseDepth();
            });
          }

          if (d5 > 0) {
            swipe("down", () => {
              decreaseCoords("d5");
            });
          }
        };

      case 6:
        return state => {
          if (d5 === 0) {
            swipe("down", () => {
              decreaseDepth();
            });
          }
        };

      case 7:
        return state => {
          if (d7 === 0) {
            swipe("down", () => {
              decreaseDepth();
            });
          }

          if (d7 > 0) {
            swipe("down", () => {
              decreaseCoords("d7");
            });
          }
        };

      case 8:
        return state => {
          if (d7 === 0) {
            swipe("down", () => {
              decreaseDepth();
            });
          }
        };

      case 9:
        return state => {
          if (d9 === 0) {
            swipe("down", () => {
              decreaseDepth();
            });
          }

          if (d9 > 0) {
            swipe("down", () => {
              decreaseCoords("d9");
            });
          }
        };
    }
  };
};
