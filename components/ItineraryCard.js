import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { connect, useSelector } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"

const ItineraryCard = ({ itinerary, addLike, removeLike, user }) => {
  const toggleLike = async () => {
    if (!user) {
      Alert.alert("You must be logged in!")
      return false
    } // Se debe loguear!
    let res

    if (itinerary.likes.includes(user._id)) {
      res = await removeLike(itinerary._id)
    } else {
      res = await addLike(itinerary._id)
    }
    console.log(res)
    if (!res.success) {
      Alert.alert(`Error: ${res.error}`)
      return false
    } // handle error
  }
  console.log(itinerary)
  return (
    <View style={styles.mainContainer}>
      <View style={styles.author}>
        <Image style={styles.photo} source={{ uri: itinerary.author.photo }} />
        <Text style={{ color: "white" }}>{itinerary.author.name}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{itinerary.title.toUpperCase()}</Text>
        <TouchableOpacity onPress={toggleLike}>
          {itinerary.likes.includes(user?._id) ? (
            <FontAwesome name="heart" size={24} color="red" />
          ) : (
            <FontAwesome name="heart-o" size={24} color="red" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.priceDurationContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="clock-o" size={24} color="white" />
          <Text style={{ color: "white", marginLeft: 5 }}>
            {itinerary.duration} hrs.
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3, 4, 5].slice(0, itinerary.price + 1).map((i) => (
            <MaterialCommunityIcons
              key={`${i}-${itinerary._id}`}
              name="currency-usd-circle-outline"
              size={24}
              color="green"
            />
          ))}
        </View>
      </View>
      <View style={{ flexDirection: "row", paddingBottom: 15 }}>
        {itinerary.hashtags.map((h) => (
          <Text
            style={{ color: "white", fontSize: 12, marginHorizontal: 5 }}
            key={`${h}${itinerary._id}`}
          >
            #{h}
          </Text>
        ))}
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}

const mapDispatchToProps = {
  addLike: itinerariesActions.addLike,
  removeLike: itinerariesActions.removeLike,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryCard)

const styles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    backgroundColor: "#1F2937",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  author: {
    width: "100%",
    alignItems: "center",
  },

  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 12,
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
    fontWeight: "700",
  },
  priceDurationContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "70%",
    paddingVertical: 10,
  },
})
