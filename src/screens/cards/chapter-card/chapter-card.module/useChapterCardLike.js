import { Alert, AlertRequireLogin } from "../../../../components/alert"

import { useStoreActions, useStoreState } from "easy-peasy"
import { selAuth, selImage, selSwiper } from "#store/selectors"
import { actData } from "#store/actions"

import { useNavigation } from "@react-navigation/native"
import * as ScreenNames from "../../../../navigators/ScreenNames"

import { ChapterService } from "#services"
import { DEPTH_NAME } from "#store/reducers/swiper.depth"
import { delay } from "../../../../utils"

const initStates = () => {
  // selectors
  const isLoggedIn = useStoreState(selAuth.isLoggedIn)
  const userId = useStoreState(selAuth.userId)
  const profile = useStoreState(selImage.profile)

  const depth = useStoreState(selSwiper.depth)

  // actions
  const fetchOneChapter = useStoreActions(actData.fetchOneChapter)
  const fetchOneUserChapter = useStoreActions(actData.fetchOneUserChapter)
  const fetchOneNext = useStoreActions(actData.fetchOneNext)

  return {
    isLoggedIn,
    userId,
    profile,
    depth,
    fetchOneChapter,
    fetchOneUserChapter,
    fetchOneNext,
  }
}

export const useChapterCardLike = (chapterId, isLike, likeCount) => {
  const {
    isLoggedIn,
    userId,
    depth,
    fetchOneChapter,
    fetchOneUserChapter,
    fetchOneNext,
  } = initStates()

  const nav = useNavigation()

  return async () => {
    if (!isLoggedIn) {
      Alert("Need Login to like this card", "close", () =>
        nav.navigate(ScreenNames.SigninStack),
      )
      return
    }

    // 이미 좋아요 했음
    if (isLike === 1) {
      console.log(
        `\n\nUNLIKE! chapterID: ${chapterId}, likeCount: ${likeCount}\n\n`,
      )
      await ChapterService.DELETE_unlikeChapter(chapterId, userId)
    } else {
      console.log(
        `\n\nLIKE! chapterID: ${chapterId}, likeCount: ${likeCount}\n\n`,
      )
      await ChapterService.POST_likeChapter(chapterId, userId)
    }

    await delay(0.3)

    switch (depth) {
      case DEPTH_NAME.CHAPTER:
        {
          fetchOneChapter()
        }
        break

      case DEPTH_NAME.USER_CHAPTER:
        {
          fetchOneUserChapter()
        }
        break

      case DEPTH_NAME.NEXT:
        {
          fetchOneNext()
        }
        break
    }
  }
}
