import { Alert } from "../../components/alert"
import { DEPTH_NAME } from "../../store/reducers/swiper.depth"
import { useSwipeStates } from "./useSwipeStates"

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
  } = useSwipeStates()
  if (!isLoaded) return null

  return () => {
    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return state => {
          if (coords.d0 === 0) {
            Alert("You are at the first category", "continue")
            console.log("첫 카테고리에서 윗 카드가 없음")
            return
          }

          swipe("down", () => {
            decreaseCoords("d0")
            setMaxCoords({ d1: categories[coords.d0].maxLength })
          })
        }

        // return state => {
        //   console.log("카테고리에서 우측 스와이프는 허용되지 않음.")
        // }

      case DEPTH_NAME.CHAPTER:
        // return state => {
        //   console.log("챕터에서는 하방 스와이프는 허용되지 않음")
        // }

        return state => {
          if (coords.d1 === 0) {
            swipe("down", () => {
              decreaseDepth()
            })
          }

          if (coords.d1 > 0) {
            swipe("down", () => {
              decreaseCoords("d1")
              setMaxCoords({ d2: chapters })
            })
          }
        }

      case DEPTH_NAME.USER_CHAPTER:
        // return state => {
        //   if (coords.d2 === 0) {
        //     swipe("down", () => {
        //       decreaseDepth()
        //     })
        //     return
        //   }

        //   swipe("down", () => {
        //     decreaseCoords("d2")
        //     updateHasNew({ d3: true })
        //     setMaxCoords({ d3: chapters })
        //   })
        // }

        return state => {
          // console.log('유저 챕터에서 우측 스와이프는 허용되지 않음.');
          if (coords.d1 === 0) {
            swipe("down", () => {
              decreaseDepth()
              decreaseDepth()
            })
          }
        }

      case DEPTH_NAME.NEXT:
        // return state => {
        //   console.log("유저 다음 카드에서는 아래로 스와이프 금지")
        // }

        return state => {
          if (coords.d3 === 0) {
            swipe("down", () => {
              decreaseDepth()
            })
          }

          if (coords.d3 > 0) {
            swipe("down", () => {
              decreaseCoords("d3")
            })
          }
        }

      default:
        throw new Error("depth 는 0~3 사이만 가능 depth: ", depth)
    }
  }
}
