import React from "react"
import { View } from "react-native"
// import { AlertWithValue } from '#components/alert';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigation } from "@react-navigation/native"
import * as ScreenNames from "#navigators/ScreenNames"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import SignupInput from "./SignupInput"
import SignupPolicyAndConditions from "./SignupPolicyAndConditions"

const initialValues = {
  email: "",
  password: "",
  passwordRepeat: "",
  isAllAllowed: false,
  isAgreementAllowed: false,
  isPrivacyPolicyAllowed: false,
  isMarketingAllowedOptional: false,
  isGoodToProceed: false,
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email(
      "please, provide it again in email format (e.g. wreader1@gmail.com ...)",
    )
    .max(28, "lettres can't be longer than 35")
    .required("You can't leave out this field"),

  password: Yup.string()
    .max(28, "lettres can't be longer than 28")
    .required("You can't leave out this field"),

  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password"), null], "neither password matches")
    .max(28, "lettres can't be longer than 28"),

  isAllAllowed: Yup.bool(),

  isAgreementAllowed: Yup.bool().oneOf(
    [true],
    "It's mandatory that allow the agreement",
  ),

  isPrivacyPolicyAllowed: Yup.bool().oneOf(
    [true],
    "It's mandatory that allow the privacy policy",
  ),

  isMarketingAllowedOptional: Yup.bool(),

  isGoodToProceed: Yup.bool().oneOf(
    [true],
    "You can't proceed without blank of any mandatory",
  ),
})

const SignupForms = () => {
  const nav = useNavigation()

  const onSubmit = values => {
    nav?.navigate(ScreenNames.Signup2, values)
  }

  const {
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={{ flex: 1 }}>
      <SignupInput
        values={values}
        onChange={handleChange}
        setFieldValue={setFieldValue}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <SignupPolicyAndConditions
        onSubmit={handleSubmit}
        values={values}
        setFieldValue={setFieldValue}
      />
    </View>
  )
}

export default SignupForms
