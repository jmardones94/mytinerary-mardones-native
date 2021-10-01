import "react-native-gesture-handler"
import React from "react"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import rootReducer from "./redux/reducers/rootReducer"
import { NavigationContainer } from "@react-navigation/native"
import Navigator from "./navigation/MainNavDrawer"
import { StatusBar } from "react-native"

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={globalStore}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  )
}
