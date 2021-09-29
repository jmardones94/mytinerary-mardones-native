import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import * as MyFont from "expo-font"
import { useSelector } from "react-redux"
import { FontAwesome } from "@expo/vector-icons"
import Loading from "./Loading"
import Layout from "../components/Layout"

const Home = (props) => {
  const [loaded, error] = MyFont.useFonts({
    lemonTuesday: require("../assets/fonts/LemonTuesday.otf"),
    silt: require("../assets/fonts/ShadowsIntoLightTwo.ttf"),
  })
  const user = useSelector((state) => state.users.user)
  console.log(user)
  if (error) {
    console.log(error)
  }
  if (!loaded) return <Loading />
  return (
    <Layout>
      <View style={styles.mainContainer}>
        <View style={styles.hero}>
          <Text style={styles.mytinerary}>MyTinerary</Text>
          <Image
            style={styles.image}
            source={{
              uri: "https://i.imgur.com/pusiedR.png?1",
            }}
          />
          <Text style={styles.title}>Find your perfect trip</Text>
          <Text style={styles.subTitle}>
            designed by insiders who know and love their cities!
          </Text>
          <Text style={styles.text}>Your dream travel starts</Text>
          <TouchableOpacity
            onPress={() => console.log("CallToAction said Ouch!")}
          >
            <View style={styles.callToAction}>
              <Text style={styles.callToActionText}>HERE</Text>
              <FontAwesome name="paper-plane" size={16} color="#DC2626" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  mytinerary: { fontFamily: "silt", fontSize: 48, color: "black" },
  image: {
    width: (Dimensions.get("window").width * 9) / 10,
    height: (Dimensions.get("window").width * 3) / 5,
  },
  title: { fontFamily: "lemonTuesday", fontSize: 30, color: "#1E40AF" },
  subTitle: { color: "#4B5563", marginBottom: 10, fontSize: 14 },
  text: { color: "#4B5563", marginTop: 15, fontSize: 20 },
  callToAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderColor: "#DC2626",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: 20,
  },
  callToActionText: {
    color: "#DC2626",
    fontWeight: "600",
    marginRight: 8,
    fontSize: 16,
  },
})
