import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import AppLoading from "expo-app-loading"
// import * as MyFont from "expo-font"
import { useSelector } from "react-redux"
import { FontAwesome } from "@expo/vector-icons"
import Loading from "./Loading"
import { ScrollView } from "react-native-gesture-handler"
import { useCustomFonts } from "../hooks/utilsHooks"
import { useCities } from "../hooks/citiesHooks"
import CitiesCarousel from "../components/CitiesCarousel"
import { useStorageLogIn } from "../hooks/userHooks"

const Home = (props) => {
  useStorageLogIn()
  const [loaded, error] = useCustomFonts()
  if (error) {
    console.log(error)
  }
  if (!loaded) return <AppLoading />
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <ScrollView>
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
              onPress={() =>
                props.navigation.navigate("citiesnav", { screen: "cities" })
              }
            >
              <View style={styles.callToAction}>
                <Text style={styles.callToActionText}>HERE</Text>
                <FontAwesome name="paper-plane" size={24} color="#DC2626" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            width: "100%",
            fontSize: 30,
            textAlign: "center",
            fontFamily: "ubuntu",
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          Popular<Text style={{ fontFamily: "silt" }}> MyTineraries</Text>
        </Text>
        <CitiesCarousel navigation={props.navigation} />
        <Text
          style={{
            marginTop: 50,
            backgroundColor: "#111827",
            color: "white",
            paddingVertical: 10,
            fontFamily: "ubuntu",
            textAlign: "center",
          }}
        >
          Copyright © 2021 by Jonathan Mardones
        </Text>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
    minHeight: (Dimensions.get("window").height * 19) / 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  hero: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mytinerary: {
    fontFamily: "silt",
    fontSize: 52,
    color: "black",
    marginVertical: 25,
  },
  image: {
    width: (Dimensions.get("window").width * 9) / 10,
    height: (Dimensions.get("window").width * 3) / 5,
  },
  title: {
    fontFamily: "lemonTuesday",
    fontSize: 30,
    color: "#1E40AF",
    marginTop: 40,
  },
  subTitle: {
    color: "#4B5563",
    marginBottom: 20,
    fontSize: 14,
    fontFamily: "silt",
  },
  text: {
    color: "#4B5563",
    marginTop: 15,
    fontSize: 20,
    fontFamily: "ubuntu",
  },
  callToAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderColor: "#DC2626",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 5,
    marginVertical: 14,
  },
  callToActionText: {
    color: "#DC2626",
    fontWeight: "600",
    marginRight: 10,
    fontSize: 20,
    fontFamily: "ubuntu",
  },
})
