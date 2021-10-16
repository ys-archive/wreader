import { useEffect } from "react"
import { Platform } from "react-native"
import { Alert } from "#components/alert"
import * as ImagePicker from "expo-image-picker"
import { useStoreActions } from "easy-peasy"
import { actImage } from "../../store/actions"

export const useImagePicker = (
  widthRatio = 4,
  heightRatio = 3,
  isCard = true,
) => {
  const setBlob = useStoreActions(actImage.setTempBlob)
  const setCard = useStoreActions(actImage.setCard)
  const setProfile = useStoreActions(actImage.setProfile)

  useEffect(() => {
    ;(async function requestMediaLibraryPermission() {
      if (
        Platform.OS === "web" ||
        Platform.OS === "macos" ||
        Platform.OS === "windows"
      )
        return

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== "granted") {
        Alert("카메라 권한이 필요한 작업입니다.", "닫기")
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: false,
      allowsEditing: true,
      aspect: [widthRatio, heightRatio],
      quality: 1,
    })

    if (!result.cancelled) {
      const { uri } = result
      // console.log('result: ', uri);

      // if (uploadLocalImagePath && typeof uploadLocalImagePath === 'function') {
      //   await uploadLocalImagePath(uri);
      // }

      // if (uploadImageFile && typeof uploadImageFile === 'function') {
      // }
      if (isCard) {
        setCard(uri)
      } else {
        setProfile(uri)
      }

      const response = await fetch(uri)
      setBlob(await response.blob())

      // await uploadImageFile(blob)
    }
  }

  return pickImage
}
