import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import City from "../screens/City"
import Cities from "../screens/Cities"
import Itinerary from "../screens/Itinerary"

const Stack = createNativeStackNavigator()

const Navigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cities" component={Cities} />
      <Stack.Screen name="city" component={City} />
      <Stack.Screen name="itinerary" component={Itinerary} />
    </Stack.Navigator>
  )
}

export default Navigator
