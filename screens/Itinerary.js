import React, { useEffect, useState } from "react"
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native"
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Loading from "./Loading"
import Comments from "../components/Comments"
import {
  useActivities,
  useComments,
  useItineraries,
} from "../hooks/citiesHooks"

const Itinerary = ({
  route,
  navigation,
  itineraries,
  user,
  addLike,
  removeLike,
  comments,
  activities,
  getItineraries,
  getActivities,
  getComments,
  addComment,
}) => {
  const [inputText, setInputText] = useState("")
  const [itinerary, setItinerary] = useState(
    itineraries.find((itinerary) => itinerary._id === route.params.id) ?? {}
  )
  const [loadingItinerary, errorItinerary] = useItineraries(
    getItineraries,
    route.params.id,
    itineraries
  )

  const [loadingActivities, errorActivities] = useActivities(
    getActivities,
    route.params.id,
    activities
  )

  useEffect(() => {
    setItinerary(
      itineraries.find((itinerary) => itinerary._id === route.params.id)
    )
  }, [itineraries])

  const addCommentHandler = async () => {
    if (!inputText) return false
    const res = await addComment(route.params.id, inputText)
    if (!res.success) return false // manejar error...
    setInputText("")
  }

  const toggleLike = async () => {
    if (!user) {
      Alert.alert("You must be logged in!")
      return false
    } // Se debe loguear!
    let res

    if (
      itineraries
        .find((itinerary) => itinerary._id === route.params.id)
        .likes.includes(user._id)
    ) {
      res = await removeLike(itinerary._id)
    } else {
      res = await addLike(itinerary._id)
    }
    if (!res.success) {
      Alert.alert(`Error: ${res.error}`)
      return false
    } // handle error
  }

  if (loadingItinerary || loadingActivities) return <Loading />
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{itinerary.title}</Text>
          <View style={styles.author}>
            <Image
              style={styles.authorPhoto}
              source={{ uri: itinerary.author.photo }}
            />
            <Text style={styles.authorName}>{itinerary.author.name}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionItem_likes}>
              <Text style={{ fontSize: 20, color: "black", marginRight: 10 }}>
                {itinerary.likes.length}
              </Text>
              <TouchableOpacity onPress={toggleLike}>
                {itinerary.likes.includes(user?._id) ? (
                  <FontAwesome name="heart" size={30} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={30} color="red" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.descriptionItem_price}>
              {[1, 2, 3, 4, 5].slice(0, itinerary.price).map((i) => (
                <MaterialCommunityIcons
                  key={`${i}-${itinerary._id}`}
                  name="currency-usd-circle-outline"
                  size={30}
                  color="green"
                />
              ))}
            </View>
            <View style={styles.descriptionItem_duration}>
              <FontAwesome name="clock-o" size={30} color="black" />
              <Text style={{ color: "black", marginLeft: 5, fontSize: 20 }}>
                {itinerary.duration} hrs.
              </Text>
            </View>
            <Text style={styles.descriptionItem_hashtags}>
              {itinerary.hashtags.reduce((a, b) => a + " #" + b, "").slice(1)}
            </Text>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Activities</Text>
            {activities
              .filter((activity) => activity.itineraryId === route.params.id)
              .map((activity) => (
                <View key={activity._id}>
                  <ImageBackground
                    style={styles.activityPic}
                    source={{ uri: activity.pic }}
                  >
                    <Text style={styles.activityName}>{activity.title}</Text>
                  </ImageBackground>
                </View>
              ))}
          </View>
          <Comments itineraryId={route.params.id} />
        </View>
        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.inputText}
            editable={user !== false}
            value={inputText}
            onChangeText={(value) => setInputText(value)}
            placeholder={
              user ? "Leave a comment." : "Log In to leave a comment."
            }
          />
          <TouchableOpacity
            onPress={addCommentHandler}
            disabled={user === false}
          >
            <View style={styles.postCommentButton}>
              <MaterialCommunityIcons name="send" size={30} color="#374151" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.goBackButton}>
            <Text style={{ color: "white" }}>GO BACK</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    itineraries: state.itineraries.itineraries,
    comments: state.itineraries.comments,
    activities: state.itineraries.activities,
  }
}

const mapDispatchToProps = {
  getItineraries: itinerariesActions.getItineraries,
  getActivities: itinerariesActions.getActivities,
  getComments: itinerariesActions.getComments,
  addComment: itinerariesActions.addComment,
  addLike: itinerariesActions.addLike,
  removeLike: itinerariesActions.removeLike,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)

const styles = StyleSheet.create({
  mainContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "600",
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 40,
    marginBottom: 15,
  },
  author: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  authorPhoto: { height: 150, width: 150, borderRadius: 75 },
  authorName: { marginTop: 10, fontWeight: "bold", fontSize: 18 },
  descriptionContainer: {
    width: "90%",
    alignItems: "center",
  },
  descriptionItem_likes: { flexDirection: "row", marginVertical: 5 },
  descriptionItem_price: { flexDirection: "row", marginVertical: 5 },
  descriptionItem_duration: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  descriptionItem_hashtags: {
    marginVertical: 5,
    fontSize: 14,
    color: "gray",
  },
  activityPic: {
    width: (Dimensions.get("window").width * 9) / 10,
    height: Dimensions.get("window").height / 2,
    borderRadius: 7,
    overflow: "hidden",
    justifyContent: "flex-end",
    marginVertical: 12,
  },
  activityName: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 8,
    textTransform: "uppercase",
  },

  addCommentContainer: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputText: {
    flex: 1,
    paddingVertical: 8,
    width: "80%",
    marginRight: 5,
  },
  goBackButton: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#374151",
    alignItems: "center",
    paddingVertical: 12,
    marginVertical: 15,
    borderRadius: 7,
  },
})
