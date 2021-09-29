import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import { AntDesign } from "@expo/vector-icons"
import userActions from "../redux/actions/usersActions"

const Header = ({ user, logOut }) => {
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.logo}
        source={{
          uri: "https://mytinerary-mardones.herokuapp.com/static/media/light_logo.018e6c46.png",
        }}
      /> */}
      {user && <Text style={styles.welcome}>Welcome, {user.firstName}!</Text>}
      {/* {user && (
        <View style={styles.session}>
          <Text style={styles.welcome}>Welcome, {user.firstName}!</Text>
          <TouchableOpacity onPress={() => logOut()}>
            <View style={[styles.button, styles.log]}>
              <AntDesign name="logout" size={16} color="white" />
              <Text style={styles.buttonText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {!user && (
        <View style={styles.session}>
          <TouchableOpacity onPress={() => console.log("Llévame a log in!")}>
            <View style={[styles.button, styles.log]}>
              <AntDesign name="login" size={16} color="white" />
              <Text style={styles.buttonText}>Log In</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Llévame a sign up!")}>
            <View style={[styles.button, styles.signUp]}>
              <AntDesign name="adduser" size={16} color="white" />
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}*/}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}

const mapDispatchToProps = {
  logOut: userActions.logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  logo: { width: 50, height: 50 },
  session: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcome: { fontSize: 18, color: "#374151", marginHorizontal: 6 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 6,
  },
  buttonText: { color: "white", fontWeight: "600", marginHorizontal: 6 },
  signUp: { backgroundColor: "#10B981" },
  log: { backgroundColor: "#374151" },
})
