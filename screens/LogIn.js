import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"
import userActions from "../redux/actions/usersActions"
import { useLogIn } from "../hooks/userHooks"
import Loading from "./Loading"
import Layout from "../components/Layout"

const LogIn = ({ logIn }) => {
  const [formik, loading, error] = useLogIn(logIn)
  if (loading) return <Loading />
  return (
    <Layout>
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
          style={{ width: "100%" }}
        >
          <View style={[styles.logInButton, { marginBottom: error ? 5 : 20 }]}>
            <Text style={{ color: "white" }}>Log In</Text>
          </View>
        </TouchableOpacity>
        {error && (
          <Text style={[styles.errorText, { textAlign: "center" }]}>
            {error}
          </Text>
        )}
        <Text>Already have an account? Sign Up</Text>
      </View>
    </Layout>
  )
}

const mapDispatchToProps = {
  logIn: userActions.logIn,
}

export default connect(null, mapDispatchToProps)(LogIn)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  inputText: {
    borderColor: "lightgray",
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontSize: 20,
  },
  errorText: { color: "red", fontSize: 12 },
  logInButton: {
    width: "100%",
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
})
