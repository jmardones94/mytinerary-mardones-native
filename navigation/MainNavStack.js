import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Home from "../screens/Home"
import City from "../screens/City"
import Cities from "../screens/Cities"
import Itinerary from "../screens/Itinerary"
import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import { useSelector } from "react-redux"
import CurrencySymbol from "../components/CurrencySymbol"

const Stack = createNativeStackNavigator()

const Navigator = (props) => {
  const user = useSelector((state) => state.users.user)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="city"
        component={City}
        options={{
          title: "City",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cities"
        component={Cities}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="itinerary"
        component={Itinerary}
        options={{
          title: "Itinerary",
        }}
      />
      <Stack.Screen
        name="login"
        component={LogIn}
        options={{
          title: "Log In",
        }}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{
          title: "Sign Up",
        }}
      />
    </Stack.Navigator>
  )
}

export default Navigator
