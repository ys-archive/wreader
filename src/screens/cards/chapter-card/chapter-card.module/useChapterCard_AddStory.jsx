import React from "react"

import { AddStory } from "#components/icon"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useChapterCard_GoWritingCardDirectly } from "./useChapterCard_GoWritingCardDirectly"
import { useStoreState } from "easy-peasy"
import { selSwiper } from "#store/selectors"

export const useChapterCard_AddStory = () => {
  const depth = useStoreState(selSwiper.depth)

  const goWriteCardDirectly = useChapterCard_GoWritingCardDirectly()

  return (
    (depth === 1 || depth === 2 || depth === 3) && (
      <AddStory onPress={goWriteCardDirectly} />
    )
  )
}
