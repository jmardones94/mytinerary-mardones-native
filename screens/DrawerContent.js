import React from "react"
import { useSelector } from "react-redux"
import { Alert, StyleSheet, View, Image } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  //   TouchableRipper,
  Switch,
} from "react-native-paper"
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons"
import { useCustomFonts } from "../hooks/utilsHooks"
import AppLoading from "expo-app-loading"

const DrawerContent = (props) => {
  const user = useSelector((state) => state.users.user)
  const [loaded, error] = useCustomFonts()
  if (!loaded) return <AppLoading />
  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.mainContent}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
              marginBottom: 30,
            }}
          >
            <Avatar.Image
              size={50}
              source={{
                uri: "https://mytinerary-mardones.herokuapp.com/static/media/light_logo.018e6c46.png",
              }}
            />
            <Text
              style={{
                textAlign: "left",
                fontSize: 32,
                fontFamily: "silt",
                marginLeft: 10,
              }}
            >
              MyTinerary
            </Text>
          </View>
          <View style={styles.userSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
                alignItems: "center",
              }}
            >
              {user ? (
                <Avatar.Image source={{ uri: user.photoURL }} size={50} />
              ) : (
                <FontAwesome name="user-circle-o" size={50} color="#4B5563" />
              )}
              <View style={{ marginLeft: 15 }}>
                {user ? (
                  <Title style={styles.title}>
                    {user.firstName} {user.lastName}
                  </Title>
                ) : (
                  <Text style={{ fontFamily: "ubuntu", color: "#4B5563" }}>
                    You are not logged in.
                  </Text>
                )}
                {user && <Caption style={styles.caption}>{user.email}</Caption>}
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              labelStyle={{ fontFamily: "ubuntu" }}
              onPress={() => props.navigation.navigate("home")}
              icon={({ focused, color, size }) => (
                <FontAwesome
                  name="home"
                  size={size}
                  color={focused ? color : "black"}
                />
              )}
            />
            <DrawerItem
              label="Cities"
              labelStyle={{ fontFamily: "ubuntu" }}
              onPress={() => props.navigation.navigate("citiesnav")}
              icon={({ focused, color, size }) => (
                <Entypo
                  name="globe"
                  size={size}
                  color={focused ? color : "black"}
                />
              )}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.footer}>
        {user ? (
          <>
            <DrawerItem
              label="Favorites"
              labelStyle={{ fontFamily: "ubuntu" }}
              onPress={() => props.navigation.navigate("favorites")}
              icon={({ focused, color, size }) => (
                <FontAwesome
                  name="heart"
                  size={size}
                  color={focused ? "red" : "black"}
                />
              )}
            />
            <DrawerItem
              onPress={() => props.navigation.navigate("logout")}
              label="Log Out"
              labelStyle={{ fontFamily: "ubuntu" }}
              icon={({ color, size }) => (
                <AntDesign name="logout" size={size} color={color} />
              )}
            />
          </>
        ) : (
          <>
            <DrawerItem
              label="Log In"
              labelStyle={{ fontFamily: "ubuntu" }}
              onPress={() => props.navigation.navigate("login")}
              icon={({ color, size }) => (
                <AntDesign name="login" size={size} color={color} />
              )}
            />
            <DrawerItem
              label="Sign Up"
              labelStyle={{ fontFamily: "ubuntu" }}
              onPress={() => props.navigation.navigate("signup")}
              icon={({ focused, color, size }) => (
                <AntDesign
                  name="adduser"
                  size={size}
                  color={focused ? color : "black"}
                />
              )}
            />
          </>
        )}
      </Drawer.Section>
    </View>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  drawerSection: {},
  userSection: {
    paddingLeft: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "ubuntu",
  },
  caption: {
    fontFamily: "ubuntu",
  },
  footer: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
})
