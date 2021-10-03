import React from "react"
import { useSelector } from "react-redux"
import { Text } from "react-native"
import Home from "../screens/Home"
import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import LogOut from "../screens/LogOut"
import { createDrawerNavigator } from "@react-navigation/drawer"
import CitiesNavStack from "./CitiesNavStack"
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons"
import DrawerContent from "../screens/DrawerContent"
import Loading from "../screens/Loading"
import CitiesCarousel from "../components/CitiesCarousel"
import { useCustomFonts } from "../hooks/utilsHooks"
import Favorites from "../screens/Favorites"

const Drawer = createDrawerNavigator()

const Navigator = (props) => {
  const user = useSelector((state) => state.users.user)
  const [loaded, error] = useCustomFonts()
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#111827" },
        headerTintColor: "white",
        headerTitleAlign: user ? "left" : "center",
        headerRight: (props) => (
          <Text
            style={{
              color: user ? "white" : "#111827",
              // fontFamily: "ubuntu",
              paddingHorizontal: 10,
              fontSize: 18,
            }}
          >
            {user ? `Welcome, ${user.firstName}!` : ""}
          </Text>
        ),
        headerTitleStyle: { fontWeight: "600" },
        drawerLabelStyle: { fontSize: 18 },
      }}
    >
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="citiesnav"
        component={CitiesNavStack}
        options={{
          title: "Cities",
        }}
      />
      {user ? (
        <Drawer.Group>
          <Drawer.Screen
            name="logout"
            component={LogOut}
            options={{
              title: "Log Out",
            }}
          />
          <Drawer.Screen
            name="favorites"
            component={Favorites}
            options={{
              title: "Favorites",
            }}
          />
        </Drawer.Group>
      ) : (
        <Drawer.Group>
          <Drawer.Screen
            name="login"
            component={LogIn}
            options={{
              title: "Log In",
            }}
          />
          <Drawer.Screen
            name="signup"
            component={SignUp}
            options={{
              title: "Sign Up",
            }}
          />
        </Drawer.Group>
      )}
    </Drawer.Navigator>
  )
}

export default Navigator
