import React from "react"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"

const Loading = () => {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.img}
        source={{
          uri: "https://mytinerary-mardones.herokuapp.com/static/media/light_logo.018e6c46.png",
        }}
      />
      <Text style={styles.loading}>Loading...</Text>
    </View>
  )
}

export default Loading

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
    fontSize: 32,
    marginTop: 20,
    fontFamily: "Roboto",
    fontWeight: "600",
  },
})
