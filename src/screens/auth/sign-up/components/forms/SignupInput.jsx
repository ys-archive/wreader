import React from "react"
import PropTypes from "prop-types"
import { View, Platform } from "react-native"
import { Alert } from "#components/alert"
import { StyleSheet, TextInput, Button, Text, RenderError } from "#components"
import { AuthService } from "#services"

import { Email, LockPassword } from "#components/icon"
import { colors } from "#constants"

const SignupInput = ({
  values,
  onChange,
  setFieldValue,
  onBlur,
  errors,
  touched,
}) => {
  const { email, password, passwordRepeat } = values

  const checkEmailValidToUse = async () => {
    const code = await AuthService.GET_CheckUserExists(email)

    if (code === 1) {
      Alert("Valid Mail!")
      setFieldValue("isGoodToProceed", true)
      return
    }

    if (code === 101) {
      Alert("This mail is already in use. please, use another email")
      setFieldValue("isGoodToProceed", false)
      setFieldValue("email", "")
      return
    }
  }

  const checkValidPassword = () => {
    if (password === passwordRepeat) {
      Alert("both passwords match!")
      setFieldValue("isGoodToProceed", true)
      return
    }

    Alert("both passwords does not match!")
    setFieldValue("isGoodToProceed", false)
    setFieldValue("password", "")
    setFieldValue("passwordRepeat", "")
  }

  return (
    <View style={s.root}>
      <View style={s.inputSection}>
        <View>
          <Email style={{ top: "38%" }} />
          <TextInput
            value={email}
            onChangeText={onChange("email")}
            onBlur={onBlur("email")}
            placeholder="E-MAIL ACCOUNT"
            maxLength={35}
            style={{
              marginHorizontal: 0,
              marginLeft: '5%',
              ...Platform.select({ android: { marginVertical: 0 } }),
              minWidth: "96.7%",
              maxWidth: "96.7%",
            }}
          />
          <Button
            style={s.checkEmailButton}
            textStyle={s.checkPasswordText}
            isBold
            onPress={checkEmailValidToUse}
          >
            VERIFY
          </Button>
        </View>

        <RenderError touched={touched.email} errors={errors.email} />
      </View>

      <View style={s.inputSection}>
        <LockPassword style={{ top: Platform.OS === "ios" ? "35%" : "38%" }} />
        <TextInput
          value={password}
          onChangeText={onChange("password")}
          onBlur={onBlur("password")}
          maxLength={28}
          placeholder="PASSWORD"
          style={{
            marginHorizontal: 0,
            marginLeft: '5%',
            ...Platform.select({ android: { marginVertical: 0 } }),
            minWidth: "96.7%",
            maxWidth: "96.7%",
          }}
          secureTextEntry
        />
      </View>

      <View style={s.inputSection}>
        <View>
          <LockPassword
            style={{ top: Platform.OS === "ios" ? "25%" : "32%" }}
          />
          <TextInput
            value={passwordRepeat}
            onChangeText={onChange("passwordRepeat")}
            onBlur={onBlur("passwordRepeat")}
            maxLength={28}
            placeholder="REPEAT THE PASSWORD"
            style={{
              marginHorizontal: 0,
              marginLeft: '5%',
              ...Platform.select({ android: { marginVertical: 0 } }),
              minWidth: "96.7%",
              maxWidth: "96.7%",
            }}
            secureTextEntry
          />
          <Button
            style={s.checkPasswordButton}
            textStyle={s.checkPasswordText}
            isBold
            onPress={checkValidPassword}
          >
            CHECK
          </Button>
        </View>

        <RenderError
          touched={touched.passwordRepeat}
          errors={errors.passwordRepeat}
        />
      </View>
    </View>
  )
}

SignupInput.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
}

export default SignupInput

const s = StyleSheet.create({
  root: {
    marginBottom: 30,
    // flex: 1,
  },
  inputSection: {
    paddingVertical: 5,
  },
  checkEmailButton: {
    position: "absolute",
    right: "0%",
    top: "42%",
  },
  checkPasswordText: {
    color: colors.light.white,
    fontSize: 14,
  },
  checkPasswordButton: {
    position: "absolute",
    right: "0%",
    top: Platform.OS === "ios" ? "38%" : "40%",
  },
})
