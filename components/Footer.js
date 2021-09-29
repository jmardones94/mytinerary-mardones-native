import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { FontAwesome, Entypo, Ionicons, AntDesign } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

const Footer = (props) => {
  const user = useSelector((state) => state.users.user)
  const logOut = useDispatch()
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => console.log("Llévame a Home!")}>
        <View style={styles.navButton}>
          <FontAwesome name="home" size={30} color="#4B5563" />
          <Text>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Llévame a Cities!")}>
        <View style={styles.navButton}>
          <Entypo name="globe" size={30} color="#4B5563" />
          <Text>Cities</Text>
        </View>
      </TouchableOpacity>
      {user ? (
        <>
          <TouchableOpacity onPress={() => console.log("Llévame a Settings!")}>
            <View style={styles.navButton}>
              <Ionicons name="settings" size={30} color="#4B5563" />
              <Text>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logOut({ type: "LOG_OUT" })}>
            <View style={styles.navButton}>
              <AntDesign name="logout" size={30} color="#4B5563" />
              <Text>Log Out</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => console.log("Llévame a Log In!")}>
            <View style={styles.navButton}>
              <AntDesign name="login" size={30} color="#4B5563" />
              <Text>Log In</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Llévame a Sign Up!")}>
            <View style={styles.navButton}>
              <AntDesign name="adduser" size={30} color="#4B5563" />
              <Text>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  navButton: { justifyContent: "center", alignItems: "center" },
})
