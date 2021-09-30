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
import { connect, useSelector } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"
import Loading from "./Loading"
// import CurrencySymbol from "../components/CurrencySymbol"
import itinerariesActions from "../redux/actions/itinerariesActions"
import ItineraryCard from "../components/ItineraryCard"

const City = ({
  getCities,
  getItineraries,
  itineraries,
  route,
  navigation,
}) => {
  const [city, loadingCity, errorCity] = useCity(getCities, route.params.id)
  const [loadingItineraries, setLoadingItineraries] = useState(true)
  const [errorItineraries, setErrorItineraries] = useState(null)
  useEffect(() => {
    if (
      !itineraries.filter((itinerary) => itinerary.cityId === city._id).length
    ) {
      setLoadingItineraries(true)
      setErrorItineraries(null)
      getItineraries(city._id)
        .then((res) => console.log(res))
        .catch((e) => setErrorItineraries(e))
        .finally(() => setLoadingItineraries(false))
    } else {
      setLoadingItineraries(false)
    }
  }, [city._id])
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
        {/* Currency */}
        {/* <View style={{ alignItems: "center" }}> 
          <Text>
            <Text style={{ fontWeight: "500", fontSize: 24 }}>Currency: </Text>
            <Text style={{ fontSize: 24 }}>
              {city.currencyCode}{" "}
              <CurrencySymbol symbol={city.currencySymbol} />
            </Text>
          </Text>
        </View> */}
        <View style={{ alignItems: "center", width: "100%" }}>
          {itineraries.filter((itinerary) => itinerary.cityId === city._id)
            .length ? (
            itineraries
              .filter((itinerary) => itinerary.cityId === city._id)
              .map((itinerary) => (
                <TouchableOpacity
                  style={{ width: "100%", alignItems: "center" }}
                  onPress={() =>
                    navigation.navigate("itinerary", {
                      id: itinerary._id,
                    })
                  }
                >
                  <ItineraryCard key={itinerary._id} itinerary={itinerary} />
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
            style={{ alignItems: "center", marginBottom: 40, width: "100%" }}
            onPress={() => navigation.navigate("cities")}
          >
            <View style={styles.backToCitiesBtn}>
              <Text style={styles.backToCitiesBtnText}>Back to Cities</Text>
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
  getCities: citiesActions.getCities,
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
  },
  flag: { width: 60, height: 60 },
  img: {
    width: (Dimensions.get("screen").width * 19) / 20,
    height: 200,
    borderRadius: 8,
  },
  description: {
    paddingHorizontal: 15,
    marginVertical: 30,
    textAlign: "justify",
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  backToCitiesBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#374151",
    width: "90%",
  },
  backToCitiesBtnText: { color: "white" },
})
