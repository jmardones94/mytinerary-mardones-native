import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSelector } from "react-redux"
import ItineraryCard from "../components/ItineraryCard"
import { useItineraries } from "../hooks/citiesHooks"
import { useFavorites } from "../hooks/userHooks"
import usersActions from "../redux/actions/usersActions"
import Loading from "./Loading"
import { FontAwesome5 } from "@expo/vector-icons"

const Favorites = ({ navigation }) => {
  const [favorites, loading, error] = useFavorites()
  const dimensions = useWindowDimensions()
  if (loading) return <Loading />
  return (
    <View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            minHeight: dimensions.height * 0.8,
            justifyContent: "space-between",
          }}
        >
          {favorites.length ? (
            favorites.map((favorite) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={favorite._id}
                onPress={() =>
                  navigation.navigate("citiesnav", {
                    screen: "itinerary",
                    params: {
                      itineraryId: favorite._id,
                      cityId: favorite.cityId,
                    },
                  })
                }
                style={{ width: dimensions.width, alignItems: "center" }}
              >
                <ItineraryCard itinerary={favorite} />
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "ubuntu_medium",
                  fontSize: 20,
                  marginBottom: dimensions.height * 0.2,
                }}
              >
                You have no favorites itineraries yet
              </Text>
              <FontAwesome5 name="hand-holding-heart" size={90} color="gray" />
              <Text
                style={{
                  marginTop: 40,
                  fontFamily: "ubuntu",
                  fontSize: 16,
                  color: "gray",
                }}
              >
                Give some likes to your favorites itineraries!
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ alignItems: "center", width: "100%" }}
          onPress={() => navigation.navigate("citiesnav", { screen: "cities" })}
        >
          <View style={styles.backToCitiesBtn}>
            <Text style={styles.backToCitiesBtnText}>GO TO CITIES</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
  backToCitiesBtn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    // marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#374151",
    width: "90%",
  },
  backToCitiesBtnText: { color: "white", fontFamily: "ubuntu" },
})
