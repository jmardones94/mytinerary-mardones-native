import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"
import userActions from "../redux/actions/usersActions"
import { useLogIn } from "../hooks/userHooks"
import Loading from "./Loading"

const LogIn = ({ navigation }) => {
  const [formik, loading, error] = useLogIn()
  if (loading) return <Loading />
  return (
    <View style={styles.mainContainer}>
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
        placeholder="Password"
        style={styles.inputText}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TouchableOpacity
        onPress={formik.handleSubmit}
        style={{ width: "100%", alignItems: "center" }}
      >
        <View style={[styles.logInButton, { marginBottom: error ? 5 : 20 }]}>
          <Text style={{ color: "white", fontFamily: "ubuntu" }}>LOG IN</Text>
        </View>
      </TouchableOpacity>
      {error && (
        <Text style={[styles.errorText, { textAlign: "center" }]}>{error}</Text>
      )}
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontFamily: "ubuntu" }}>
          Don't have an account yet?{" "}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <View>
            <Text
              style={{ textDecorationLine: "underline", fontFamily: "ubuntu" }}
            >
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LogIn

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
    fontFamily: "ubuntu",
  },
  errorText: { color: "red", fontSize: 12, fontFamily: "ubuntu" },
  logInButton: {
    width: "70%",
    backgroundColor: "#10B981",
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
})
