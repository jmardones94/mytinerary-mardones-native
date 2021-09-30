import React from "react"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import rootReducer from "./redux/reducers/rootReducer"
import { NavigationContainer } from "@react-navigation/native"
import Navigator from "./navigation/MainNavDrawer"

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  )
}
