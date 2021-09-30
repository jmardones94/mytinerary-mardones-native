import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import Home from "../screens/Home"
import City from "../screens/City"
import Cities from "../screens/Cities"
import Itinerary from "../screens/Itinerary"
import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import MainNavStack from "./MainNavStack"
import { useSelector } from "react-redux"
import LogOut from "../screens/LogOut"

const Drawer = createDrawerNavigator()

const Navigator = (props) => {
  const user = useSelector((state) => state.users.user)
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="home"
        component={MainNavStack}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="Cities"
        component={Cities}
        options={{
          title: "Cities",
        }}
      />
      {user ? (
        <Drawer.Screen name="Log Out" component={LogOut} />
      ) : (
        <>
          <Drawer.Screen
            name="login"
            component={LogIn}
            options={{
              title: "Log In",
            }}
          />
          <Drawer.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: "Sign Up",
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  )
}

export default Navigator
