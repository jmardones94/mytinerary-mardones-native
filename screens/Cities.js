import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native"
import { useCities } from "../hooks/citiesHooks"
import Loading from "./Loading"
import { Feather } from "@expo/vector-icons"

const Cities = ({ navigation }) => {
  const [cities, loading, error] = useCities()
  const [filterQuery, setFilterQuery] = useState("")
  if (loading) return <Loading />
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Feather style={{}} name="search" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          value={filterQuery}
          onChangeText={(value) => setFilterQuery(value)}
          placeholder="Search a city"
        />
      </View>
      <ScrollView style={{ marginVertical: 30 }}>
        {cities
          .filter((city) =>
            city.name
              .trim()
              .toLocaleLowerCase()
              .startsWith(filterQuery.trim().toLocaleLowerCase())
          )
          .map((city) => (
            <TouchableOpacity
              key={city._id}
              onPress={() => navigation.navigate("city", { id: city._id })}
            >
              <View style={styles.cityContainer}>
                <ImageBackground
                  style={styles.cityImage}
                  source={{ uri: city.src }}
                >
                  <View style={styles.innerImage}>
                    <Text style={styles.cityName}>{city.name}</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          ))}
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <View style={styles.navigateHome}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "ubuntu",
              }}
            >
              GO TO HOME
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Cities

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  searchInput: {
    width: "70%",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "ubuntu",
  },
  cityContainer: {
    marginBottom: 20,
    borderRadius: 10,
  },
  cityImage: {
    width: (Dimensions.get("screen").width * 9) / 10,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    overflow: "hidden",
  },
  innerImage: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
    width: "100%",
    height: "100%",
  },
  cityName: {
    fontSize: 24,
    color: "white",
    fontFamily: "ubuntu_medium",
  },
  navigateHome: {
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#374151",
    marginBottom: 30,
    borderRadius: 7,
  },
})
