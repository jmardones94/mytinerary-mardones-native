import React, { useEffect } from "react"
import { Text, View } from "react-native"
import { useDispatch } from "react-redux"

const LogOut = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "LOG_OUT" })
  }, [])
  return (
    <View>
      <Text>Logging Out</Text>
    </View>
  )
}

export default LogOut
