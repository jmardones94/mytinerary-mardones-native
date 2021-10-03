import React, { useState } from "react"
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
import { useActivities, useItinerary } from "../hooks/citiesHooks"

const Itinerary = ({
  route,
  navigation,
  user,
  addLike,
  removeLike,
  addComment,
}) => {
  const [inputText, setInputText] = useState("")
  const [itinerary, loadingItinerary, errorItinerary] = useItinerary(
    route.params.itineraryId,
    route.params.cityId
  )

  const [activities, loadingActivities, errorActivities] = useActivities(
    route.params.itineraryId
  )

  const addCommentHandler = async () => {
    if (!inputText) return false
    const res = await addComment(route.params.itineraryId, inputText)
    if (!res.success) return false // manejar error...
    setInputText("")
  }

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
              <Text style={styles.descriptionItem_likes_number}>
                {itinerary.likes.length}
              </Text>
              <TouchableOpacity onPress={toggleLike}>
                {itinerary.likes.includes(user?._id) ? (
                  <FontAwesome name="heart" size={30} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={30} color="red" />
                )}
              </TouchableOpacity>
              <View style={styles.descriptionItem_duration}>
                <Text style={styles.descriptionItem_duration_text}>
                  {itinerary.duration} hrs.
                </Text>
                <FontAwesome name="clock-o" size={32} color="black" />
              </View>
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
            <Text style={styles.descriptionItem_hashtags}>
              {itinerary.hashtags.reduce((a, b) => a + " #" + b, "").slice(1)}
            </Text>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Activities</Text>
            {activities
              .filter(
                (activity) => activity.itineraryId === route.params.itineraryId
              )
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
          <Comments itineraryId={route.params.itineraryId} />
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("citiesnav", {
              screen: "city",
              params: { id: itinerary.cityId },
            })
          }
        >
          <View style={styles.goBackButton}>
            <Text style={{ color: "white", fontFamily: "ubuntu" }}>
              GO BACK
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}

const mapDispatchToProps = {
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
    marginTop: 30,
    fontFamily: "ubuntu_bold",
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 40,
    marginBottom: 15,
    fontFamily: "ubuntu_medium",
  },
  author: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  authorPhoto: { height: 150, width: 150, borderRadius: 75 },
  authorName: { marginTop: 10, fontSize: 18, fontFamily: "ubuntu_medium" },
  descriptionContainer: {
    width: "90%",
    alignItems: "center",
  },
  descriptionItem_likes: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
  },
  descriptionItem_likes_number: {
    fontSize: 20,
    color: "black",
    marginRight: 8,
    fontFamily: "ubuntu",
  },
  descriptionItem_price: { flexDirection: "row", marginVertical: 5 },
  descriptionItem_duration: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    alignItems: "center",
  },
  descriptionItem_duration_text: {
    color: "black",
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "ubuntu",
    marginRight: 5,
  },
  descriptionItem_hashtags: {
    marginVertical: 7,
    fontSize: 14,
    color: "gray",
    fontFamily: "ubuntu",
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
    fontFamily: "ubuntu",
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
    fontFamily: "ubuntu",
  },
  goBackButton: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#374151",
    alignItems: "center",
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 7,
  },
})
