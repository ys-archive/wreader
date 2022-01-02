import { actSwiper } from "../../store/actions";
import { useSwipeStates } from "./useSwipeStates";

export const useSwipeRight = swipe => {
  const swipeRight = useStoreActions(actSwiper.swipeRight);

  // 우로 스와이프는 Category 에서 지원 X
  return () => {
    swipeRight({
      pos: depth % 2 === 0 ? "even" : "odd",
      swipe,
    });
  };
};

// return () => {
//   switch (depth) {
//     case DEPTH_NAME.CATEGORY:
//       return state => {
//         console.log("카테고리에서 우측 스와이프는 허용되지 않음.")
//       }

//     // return state => {
//     //   if (coords.d0 === 0) {
//     //     Alert("You are at the first category", "continue")
//     //     console.log("첫 카테고리에서 윗 카드가 없음")
//     //     return
//     //   }

//     //   swipe("right", () => {
//     //     decreaseCoords("d0")
//     //     setMaxCoords({ d1: categories[coords.d0].maxLength })
//     //   })
//     // }

//     case DEPTH_NAME.CHAPTER:
//       return state => {
//         if (coords.d1 === 0) {
//           swipe("right", () => {
//             decreaseDepth()
//           })
//         }

//         if (coords.d1 > 0) {
//           swipe("right", () => {
//             decreaseCoords("d1")
//             setMaxCoords({ d2: chapters })
//           })
//         }
//       }

//     // return state => {
//     //   console.log("챕터에서는 우측 스와이프는 허용되지 않음")
//     // }

//     case DEPTH_NAME.USER_CHAPTER:
//       // return state => {
//       //   // console.log('유저 챕터에서 우측 스와이프는 허용되지 않음.');
//       //   if (coords.d1 === 0) {
//       //     swipe("right", () => {
//       //       decreaseDepth()
//       //       decreaseDepth()
//       //     })
//       //   }
//       // }

//       return state => {
//         if (coords.d2 === 0) {
//           swipe("right", () => {
//             decreaseDepth()
//           })
//           return
//         }

//         swipe("right", () => {
//           decreaseCoords("d2")
//           updateHasNew({ d3: true })
//           setMaxCoords({ d3: chapters })
//         })
//       }

//     case DEPTH_NAME.NEXT:
//       return state => {
//         // if (coords.d3 === 0) {
//         //   swipe("right", () => {
//         //     decreaseDepth()
//         //   })
//         // }

//         if (coords.d3 > 0) {
//           swipe("right", () => {
//             decreaseCoords("d3")
//           })
//         }
//       }

//     // return state => {
//     //   console.log("유저 다음 카드에서는 아래로 스와이프 금지")
//     // }

//     default:
//       throw new Error("depth 는 0~3 사이만 가능 depth: ", depth)
//   }
// }
