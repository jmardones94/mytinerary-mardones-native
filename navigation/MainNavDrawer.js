import React from "react"
import { useSelector } from "react-redux"
import Home from "../screens/Home"
import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import LogOut from "../screens/LogOut"
import { createDrawerNavigator } from "@react-navigation/drawer"
import CitiesNavStack from "./CitiesNavStack"
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons"
import Loading from "../screens/Loading"
import CitiesCarousel from "../components/CitiesCarousel"

const Drawer = createDrawerNavigator()

const Navigator = (props) => {
  const user = useSelector((state) => state.users.user)
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#111827" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "600" },
        drawerLabelStyle: { fontSize: 18 },
      }}
    >
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          title: "Home",
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="home"
              size={size}
              color={focused ? color : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="citiesnav"
        component={CitiesNavStack}
        options={{
          title: "Cities",
          drawerIcon: ({ focused, color, size }) => (
            <Entypo
              name="globe"
              size={size}
              color={focused ? color : "black"}
            />
          ),
        }}
      />
      {user ? (
        <Drawer.Screen
          name="logout"
          component={LogOut}
          options={{
            title: "Log Out",
            drawerIcon: ({ focused, color, size }) => (
              <AntDesign
                name="logout"
                size={size}
                color={focused ? color : "black"}
              />
            ),
          }}
        />
      ) : (
        <Drawer.Group>
          <Drawer.Screen
            name="login"
            component={LogIn}
            options={{
              title: "Log In",
              drawerIcon: ({ focused, color, size }) => (
                <AntDesign
                  name="login"
                  size={size}
                  color={focused ? color : "black"}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="signup"
            component={SignUp}
            options={{
              title: "Sign Up",
              drawerIcon: ({ focused, color, size }) => (
                <AntDesign
                  name="adduser"
                  size={size}
                  color={focused ? color : "black"}
                />
              ),
            }}
          />
        </Drawer.Group>
      )}
    </Drawer.Navigator>
  )
}

export default Navigator
