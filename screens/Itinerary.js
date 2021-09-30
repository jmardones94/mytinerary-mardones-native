import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"

const Itinerary = ({
  route,
  itineraries,
  user,
  comments,
  activities,
  getItineraries,
  getActivities,
  getComments,
  addComment,
  editComment,
  removeComment,
}) => {
  console.log("ITINERARIES")
  console.log(itineraries)
  const [itinerary, setItinerary] = useState(
    itineraries.find((itinerary) => itinerary._id === route.params.id) ?? {}
  )
  useEffect(() => {
    if (!itinerary) {
      getItineraries(route.params.id)
        .then((res) => console.log(res))
        .catch((e) => console.error(e.message))
    }
    if (
      !comments.filter((comment) => comment.itineraryId === route.params.id)
        .length
    ) {
      getComments(route.params.id)
        .then((res) => console.log("Ya hice fetch de los comments."))
        .catch((e) => console.error(e.message))
    }
    if (
      !activities.filter((activity) => activity.itineraryId === route.params.id)
        .length
    ) {
      getActivities(route.params.id)
        .then((res) => console.log("Ya hice fetch de las activities"))
        .catch((e) => console.error(e.message))
    }
  }, [route.params.id])
  console.log("[ITINERARY]")
  console.log(itinerary)
  console.log("[COMMENTS]")
  console.log(
    comments.filter((comment) => comment.itineraryId === route.params.id)
  )
  console.log("[ACTIVITIES]")
  console.log(
    activities.filter((activity) => activity.itineraryId === route.params.id)
  )
  return (
    <View>
      <Text>Itinerary Page</Text>
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
  editComment: itinerariesActions.editComment,
  removeComment: itinerariesActions.removeComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)

const styles = StyleSheet.create({})
