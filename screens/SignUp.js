import React from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native"
import { connect } from "react-redux"
import { useSignUp } from "../hooks/userHooks"
import { useCountries } from "../hooks/utilsHooks"
import userActions from "../redux/actions/usersActions"
import Loading from "./Loading"
import { Picker } from "@react-native-picker/picker"

const SignUp = ({ signUp, navigation }) => {
  const [formik, loading, error] = useSignUp(signUp)
  const countries = useCountries()
  if (loading) return <Loading />
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{ width: "100%", paddingVertical: 35 }}>
        <View style={styles.mainContainer}>
          <TextInput
            onChangeText={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            value={formik.values.firstName}
            placeholder="First Name"
            style={styles.inputText}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <Text style={styles.errorText}>{formik.errors.firstName}</Text>
          )}
          <TextInput
            onChangeText={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            value={formik.values.lastName}
            placeholder="Last Name"
            style={styles.inputText}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <Text style={styles.errorText}>{formik.errors.lastName}</Text>
          )}
          <TextInput
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            value={formik.values.email}
            placeholder="Email"
            style={styles.inputText}
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          )}
          <TextInput
            secureTextEntry={true}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
            placeholder="Password"
            style={styles.inputText}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}
          <TextInput
            secureTextEntry={true}
            onChangeText={formik.handleChange("confirmPassword")}
            onBlur={formik.handleBlur("confirmPassword")}
            value={formik.values.confirmPassword}
            placeholder="Confirm Password"
            style={styles.inputText}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Text style={styles.errorText}>
              {formik.errors.confirmPassword}
            </Text>
          )}
          <TextInput
            onChangeText={formik.handleChange("photoURL")}
            onBlur={formik.handleBlur("photoURL")}
            value={formik.values.photoURL}
            placeholder="Photo URL"
            style={styles.inputText}
          />
          {formik.touched.photoURL && formik.errors.photoURL && (
            <Text style={styles.errorText}>{formik.errors.photoURL}</Text>
          )}
          <View style={styles.pickerCointainer}>
            <Picker
              style={styles.pickerText}
              selectedValue={formik.values.country}
              onValueChange={formik.handleChange("country")}
            >
              <Picker.Item color="gray" label="Select a country" value="" />
              {countries.map((country) => (
                <Picker.Item
                  label={country.name}
                  key={country.name}
                  value={country.name}
                />
              ))}
            </Picker>
          </View>
          {formik.touched.country && formik.errors.country && (
            <Text style={styles.errorText}>{formik.errors.country}</Text>
          )}
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={{ width: "100%", alignItems: "center" }}
          >
            <View style={styles.signUpButton}>
              <Text style={{ color: "white" }}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          {error && (
            <Text style={[styles.errorText, { textAlign: "center" }]}>
              {error}
            </Text>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text>Already have an account? </Text>

            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <View>
                <Text style={{ textDecorationLine: "underline" }}>Log In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const mapDispatchToProps = {
  signUp: userActions.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputText: {
    borderColor: "lightgray",
    borderWidth: 1,
    width: "70%",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontSize: 20,
  },
  pickerCointainer: {
    width: "70%",
    borderColor: "lightgray",
    borderWidth: 1,
    paddingVertical: 16,
    margin: 5,
    borderRadius: 5,
  },
  pickerText: { width: "100%" },
  errorText: { color: "red", fontSize: 12 },
  signUpButton: {
    width: "70%",
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
})
