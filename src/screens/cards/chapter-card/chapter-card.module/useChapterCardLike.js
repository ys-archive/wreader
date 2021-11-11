import { Alert } from "../../../../components/alert"

import { useStoreActions, useStoreState } from "easy-peasy"
import { selAuth, selImage, selSwiper, selSort } from "#store/selectors"
import { actDataFetch } from "../../../../store/actions"

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
  const fetchOneChapter = useStoreActions(actDataFetch.fetchOneChapter)
  const fetchOneUserChapter = useStoreActions(actDataFetch.fetchOneUserChapter)
  const fetchOneNext = useStoreActions(actDataFetch.fetchOneNext)

  // sort
  const savedChapterId = useStoreState(selSort.savedChapterId)

  return {
    isLoggedIn,
    userId,
    profile,
    depth,
    fetchOneChapter,
    fetchOneUserChapter,
    fetchOneNext,
    savedChapterId,
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
    savedChapterId,
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
        `\n[useChapterCardLike] UNLIKE (chapterID: ${chapterId}, likeCount: ${likeCount})`,
      )
      await ChapterService.DELETE_unlikeChapter(chapterId, userId)
    } else {
      console.log(
        `\n[useChapterCardLike] LIKE (chapterID: ${chapterId}, likeCount: ${likeCount})`,
      )
      await ChapterService.POST_likeChapter(chapterId, userId)
    }

    await delay(1)

    switch (depth) {
      case DEPTH_NAME.CHAPTER:
        {
          fetchOneChapter(chapterId)
        }
        break

      case DEPTH_NAME.USER_CHAPTER:
        {
          fetchOneUserChapter({ chapterId, savedChapterId })
        }
        break

      case DEPTH_NAME.NEXT:
        {
          fetchOneNext(chapterId)
        }
        break
    }
  }
}
