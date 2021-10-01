import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { connect } from "react-redux"
import { useComments } from "../hooks/citiesHooks"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Loading from "../screens/Loading"
import Comment from "./Comment"

const Comments = ({ itineraryId, comments, getComments }) => {
  const [loadingComments, errorComments] = useComments(
    getComments,
    itineraryId,
    comments
  )
  if (loadingComments) return <Loading />
  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.sectionTitle}>Comments</Text>
      <View style={styles.commentsContainer}>
        <ScrollView>
          {comments.filter((comment) => comment.itineraryId === itineraryId)
            .length ? (
            comments
              .filter((comment) => comment.itineraryId === itineraryId)
              .map((comment) => <Comment key={comment._id} comment={comment} />)
          ) : (
            <Text style={styles.noCommentsYet}>
              There's no comments yet. Be the first!
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    comments: state.itineraries.comments,
  }
}

const mapDispatchToProps = {
  getComments: itinerariesActions.getComments,
  addComment: itinerariesActions.addComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 40,
    marginBottom: 15,
  },
  commentsContainer: {
    width: "80%",
    alignSelf: "center",
    height: 250,
  },
  noCommentsYet: { alignSelf: "center", marginTop: 80, fontSize: 16 },
})
