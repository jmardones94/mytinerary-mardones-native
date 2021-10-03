import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import userActions from "../redux/actions/usersActions"
const LogOut = () => {
  const user = useSelector((state) => state.users.user)
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => dispatch(userActions.logOut()), 1000)
  }, [])
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.img}
        source={{
          uri: "https://mytinerary-mardones.herokuapp.com/static/media/light_logo.018e6c46.png",
        }}
      />
      <Text style={styles.loading}>Logging out...</Text>
      <Text style={styles.seeYouSoon}>See you soon, {user.firstName}!</Text>
    </View>
  )
}

export default LogOut

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: (Dimensions.get("screen").width * 5) / 10,
    height: (Dimensions.get("screen").width * 5) / 10,
  },
  loading: {
    fontSize: 40,
    marginTop: 20,
    fontFamily: "silt",
  },
  seeYouSoon: { fontSize: 24, marginTop: 10, fontFamily: "silt" },
})
