import React from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native"
import Header from "./components/Header"
import Cities from "./screens/Cities"
import City from "./screens/City"
import Home from "./screens/Home"
import Itinerary from "./screens/Itinerary"
import LogIn from "./screens/LogIn"
import SignUp from "./screens/SignUp"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import rootReducer from "./redux/reducers/rootReducer"
import Footer from "./components/Footer"
import Loading from "./screens/Loading"

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={globalStore}>
      <SafeAreaView style={styles.container}>
        {/* <Home /> */}
        {/* <SignUp /> */}
        {/* <LogIn /> */}
        {/* <Cities /> */}
        <City />
        {/* <Itinerary /> */}
        {/* <Loading /> */}
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
  },
})
