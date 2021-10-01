import React from "react"
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useCities } from "../hooks/citiesHooks"
import Carousel from "react-native-snap-carousel"
import AppLoading from "expo-app-loading"
import { TouchableOpacity } from "react-native-gesture-handler"

const dimensions = Dimensions.get("screen")

const CitiesCarousel = ({ navigation }) => {
  const [cities, loading, error] = useCities()
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("citiesnav", {
              screen: "city",
              params: { id: item._id },
            })
          }
        >
          <ImageBackground style={styles.cityImage} source={{ uri: item.src }}>
            <Text style={styles.cityName}>{item.name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }
  if (loading) return <AppLoading />
  if (!cities.length)
    return (
      <View>
        <Text>Where are the cities, huh?</Text>
      </View>
    )
  return (
    <View style={{ alignItems: "center" }}>
      <Carousel
        data={cities}
        loop={true}
        autoplay={true}
        layout={"stack"}
        renderItem={renderItem}
        sliderWidth={dimensions.width * 0.9}
        itemWidth={dimensions.width * 0.8}
      />
    </View>
  )
}

export default CitiesCarousel

const styles = StyleSheet.create({
  cityName: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontFamily: "ubuntu",
    fontSize: 20,
    paddingVertical: 10,
  },
  cityImage: {
    width: "100%",
    height: Dimensions.get("screen").height * 0.4,
    borderRadius: 7,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
})
