import { Alert } from "#components/alert"
import { useFormik } from "formik"
import * as Yup from "yup"
import uuid from "react-native-uuid"

import { useStoreState, useStoreActions } from "easy-peasy"
import { selImage } from "../../../store/selectors"
import { actImage } from "../../../store/actions"

import { ChapterService } from "../../../services"
import { ImageService } from "../../../services"

const initialValues = {
  sentence: "",
}

const validationSchema = Yup.object({
  sentence: Yup.string()
    .min(4)
    .required("Min is 4")
    .max(120)
    .required("Max is 120"),
})

const uploadDirName = `writeCardImage-${uuid.v4()}`

const initStates = () => {
  // selectors
  const cardImageUrl = useStoreState(selImage.card)
  const isCardStartUploading = useStoreState(selImage.isCardStartUploading)
  const tempBlob = useStoreState(selImage.tempBlob)

  // actions
  const setCardImageUrl = useStoreActions(actImage.setCard)
  const startUploadingCardImage = useStoreActions(actImage.startUploadingCard)
  const completeUploadCardImage = useStoreActions(
    actImage.completeUploadingCard,
  )
  const resetTempBlob = useStoreActions(actImage.resetTempBlob)

  return {
    setCardImageUrl,
    startUploadingCardImage,
    tempBlob,
    completeUploadCardImage,
    cardImageUrl,
    isCardStartUploading,
    resetTempBlob,
  }
}

export const useWriteChapterCardForm = (
  userId,
  currentChapterIdx,
  currentCategoryIdx,
  afterFormSubmitted,
) => {
  const {
    setCardImageUrl,
    startUploadingCardImage,
    tempBlob,
    completeUploadCardImage,
    cardImageUrl,
    resetTempBlob,
  } = initStates()

  const onSubmit = async values => {
    let downloadUrl = ""

    if (tempBlob !== null) {
      console.log("card image selected")
      startUploadingCardImage()

      downloadUrl = await ImageService.uploadImageFile(uploadDirName, tempBlob)
    }

    const { sentence } = values

    const status = await ChapterService.POST_createChapter(
      userId,
      currentChapterIdx,
      sentence,
      currentCategoryIdx,
      cardImageUrl === "" ? null : cardImageUrl,
    )

    console.log(`Card written at ${currentCategoryIdx}:${currentChapterIdx}`)

    if (tempBlob !== null) {
      setCardImageUrl(downloadUrl)
      completeUploadCardImage()
      resetTempBlob()
    }

    if (status === 200) {
      await afterFormSubmitted()
    } else {
      Alert("Writing chapter fails")
    }
  }

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })
}
