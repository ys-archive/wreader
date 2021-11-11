import React, { useEffect } from "react"
import { View } from "react-native"
import { Alert } from "#components/alert"

import { useStoreActions } from "easy-peasy"
import { actAuth } from "../../../../../store/actions"
import { useFormik } from "formik"
import { useNavigation } from "@react-navigation/native"
import * as Yup from "yup"
import * as ScreenNames from "#navigators/ScreenNames"
import { AuthService } from "#services"

import SigninInput from "./SigninInput"
import SigninAutoLogin from "./SigninAutoLogin"
import SigninLogin from "./SigninLogin"
import { useCardResetToStartScreen } from "../../../../cards/useCardResetToStartScreen"

import * as SecureStore from "expo-secure-store"
import StorageService from "../../../../../services/StorageService"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email(
      "please, provide it again in email format (e.g. wreader1@gmail.com ...)",
    )
    .required("You can't leave out this field"),

  password: Yup.string()
    .max(28, "lettres can't be longer than 28")
    .required("You can't leave out this field"),
})

const SigninForms = () => {
  const login = useStoreActions(actAuth.login)
  const setEmail = useStoreActions(actAuth.setEmail)
  const setPassword = useStoreActions(actAuth.setPassword)
  const setUserId = useStoreActions(actAuth.setUserId)
  const setInfo = useStoreActions(actAuth.setInfo)
  const returnToMain = useCardResetToStartScreen()

  const nav = useNavigation()

  const onSubmit = async values => {
    const { email, password } = values

    if (!email) {
      Alert("Please, fill out the email")
      return
    }

    if (!password) {
      Alert("Please, fill out the password")
      return
    }

    const { code, item } = await AuthService.POST_login(email, password)

    if (code === 1) {
      console.log(email, password, item.id, item)
      login()
      setEmail(email)
      setPassword(password)
      setUserId(item.id)
      setInfo(item)

      if ((await SecureStore.getItemAsync("isAutoLogin")) === "true") {
        await StorageService.saveSigninInfo(email, password)
        console.log("Auto Login + 데이터 등록됨: ", email, password)
      }

      nav.navigate(ScreenNames.Main)
      returnToMain()
    }

    if (code === 100) {
      Alert("Fail (it's in the withdrawal status)")
      return
    }

    if (code === 102 || code === 103) {
      Alert("Fail (neither email or password is correct)")
      return
    }
  }

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  useEffect(() => {
    setFieldValue("email", "")
    setFieldValue("password", "")
  }, [])

  return (
    <View>
      <SigninInput
        values={values}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <SigninAutoLogin />
      <SigninLogin onSubmit={handleSubmit} />
    </View>
  )
}

export default SigninForms
