import React, { useEffect, useState } from "react"
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { useCity } from "../hooks/citiesHooks"
import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"
import Loading from "./Loading"
import itinerariesActions from "../redux/actions/itinerariesActions"
import ItineraryCard from "../components/ItineraryCard"
import { useItineraries } from "../hooks/citiesHooks"

const City = ({ route, navigation }) => {
  const [city, loadingCity, errorCity] = useCity(route.params.id)
  const [itineraries, loadingItineraries, errorItineraries] = useItineraries(
    city?._id
  )
  if (loadingCity || loadingItineraries) return <Loading />
  if (errorCity || errorItineraries) return <Text>Error.</Text>
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.title}>
          <Image style={styles.flag} source={{ uri: city.countryFlag }} />
          <Text style={styles.titleText}>{city.name}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image style={styles.img} source={{ uri: city.src }} />
        </View>
        <View>
          <Text style={styles.description}>{city.description}</Text>
        </View>
        <View style={{ alignItems: "center", width: "100%" }}>
          {itineraries.filter((itinerary) => itinerary.cityId === city._id)
            .length ? (
            itineraries
              .filter((itinerary) => itinerary.cityId === city._id)
              .map((itinerary) => (
                <TouchableOpacity
                  key={itinerary._id}
                  style={{ width: "100%", alignItems: "center" }}
                  onPress={() =>
                    navigation.navigate("itinerary", {
                      itineraryId: itinerary._id,
                      cityId: city._id,
                    })
                  }
                >
                  <ItineraryCard itinerary={itinerary} />
                </TouchableOpacity>
              ))
          ) : (
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "gray",
                  marginTop: 14,
                }}
              >
                There are no itineraries for this city yet.
              </Text>
            </>
          )}
          <TouchableOpacity
            style={{ alignItems: "center", width: "100%" }}
            onPress={() => navigation.navigate("cities")}
          >
            <View style={styles.backToCitiesBtn}>
              <Text style={styles.backToCitiesBtnText}>GO TO CITIES</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", marginBottom: 40, width: "100%" }}
            onPress={() => navigation.navigate("home")}
          >
            <View style={styles.backToCitiesBtn}>
              <Text style={styles.backToCitiesBtnText}>GO TO HOME</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries.itineraries,
  }
}
const mapDispatchToProps = {
  getItineraries: itinerariesActions.getItineraries,
}

export default connect(mapStateToProps, mapDispatchToProps)(City)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 36,
    textAlign: "center",
    marginVertical: 40,
    marginHorizontal: 20,
    maxWidth: "60%",
    fontFamily: "ubuntu_medium",
  },
  flag: { width: 60, height: 60 },
  img: {
    width: (Dimensions.get("screen").width * 19) / 20,
    height: 200,
    borderRadius: 8,
  },
  description: {
    paddingHorizontal: 18,
    marginVertical: 30,
    textAlign: "justify",
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontFamily: "ubuntu",
  },
  backToCitiesBtn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#374151",
    width: "90%",
  },
  backToCitiesBtnText: { color: "white", fontFamily: "ubuntu" },
})
