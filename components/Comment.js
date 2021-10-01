import React, { useState } from "react"
import { Alert, StyleSheet, Text, View, Image } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import { FontAwesome } from "@expo/vector-icons"

const Comment = ({ comment, user, removeComment, editComment }) => {
  const [editInput, setEditInput] = useState(comment.content)
  const [isEditing, setIsEditing] = useState(false)
  const removeCommentHandler = async () => {
    Alert.alert(
      "Are you sure?",
      "This is a permanent action.",
      [
        {
          text: "cancel",
          style: "cancel",
          onPress: () => console.log("Comment is safe :)"),
        },
        {
          text: "delete",
          style: "destructive",
          onPress: async () => {
            const res = await removeComment(comment._id, comment.itineraryId)
            if (!res.success)
              Alert.alert(
                "Error",
                "Please try again later. If the problem persists, please contact us.",
                [{ text: "OK", style: "default" }],
                { cancelable: true }
              )
          },
        },
      ],
      { cancelable: true }
    )
  }
  const editCommentHandler = async () => {
    const res = await editComment(comment._id, editInput)
    if (!res.success)
      return Alert.alert(
        "Error",
        "We couldn't update your comment. Please try again later."
      )
    setIsEditing(false)
  }
  return (
    <View key={comment._id} style={{ marginVertical: 5 }}>
      <View style={styles.commentAuthorContainer}>
        <Image
          style={styles.commentAuthorPhoto}
          source={{ uri: comment.userId.photoURL }}
        />
        <Text style={styles.commentAuthorName}>
          {comment.userId.firstName} {comment.userId.lastName}{" "}
          <Text style={styles.said}>said:</Text>
        </Text>
      </View>
      <View style={styles.commentContentContainer}>
        {isEditing ? (
          <View style={{ flex: 1, marginLeft: 30, marginRight: 10 }}>
            <TextInput
              required
              value={editInput}
              style={{
                borderColor: "lightgray",
                borderWidth: 1,

                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
              onChangeText={(v) => setEditInput(v)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginVertical: 8,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.editButton,
                  { backgroundColor: "gray", marginRight: 7 },
                ]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={{ color: "white", fontFamily: "ubuntu" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  { backgroundColor: "#FBBF24", marginLeft: 5 },
                ]}
                onPress={editCommentHandler}
              >
                <Text style={{ color: "white", fontFamily: "ubuntu" }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.commentContent}>{comment.content}</Text>
        )}
        {user?._id === comment.userId._id && (
          <View style={styles.commentButtonsContainer}>
            {!isEditing && (
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => setIsEditing(true)}
              >
                <FontAwesome name="edit" size={24} color="#FBBF24" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => removeCommentHandler()}>
              <FontAwesome name="trash-o" size={24} color="#DC2626" />
            </TouchableOpacity>
          </View>
        )}
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
  editComment: itinerariesActions.editComment,
  removeComment: itinerariesActions.removeComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)

const styles = StyleSheet.create({
  commentAuthorContainer: { flexDirection: "row", alignItems: "center" },
  commentAuthorPhoto: { width: 40, height: 40, borderRadius: 20 },
  commentAuthorName: {
    fontSize: 18,
    marginLeft: 5,
    fontFamily: "ubuntu_bold",
  },
  said: {
    fontSize: 16,
    color: "gray",
    fontFamily: "ubuntu",
  },
  commentContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  commentContent: { paddingLeft: 40, fontSize: 16, fontFamily: "ubuntu" },
  commentButtonsContainer: { flexDirection: "row", alignItems: "center" },
})
