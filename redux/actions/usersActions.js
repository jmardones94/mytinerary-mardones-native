import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const usersActions = {
  logIn: (data) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(
          "https://mytinerary-mardones.herokuapp.com/api/user/login",
          data
        )
        if (!res.data.success) {
          throw new Error(res.data.error)
        }
        await AsyncStorage.setItem(
          "token",
          res.data.response.token,
          (e) => e && console.log(e)
        )
        dispatch({ type: "LOG_IN", payload: res.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  signUp: (data) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(
          "https://mytinerary-mardones.herokuapp.com/api/user/signup",
          data
        )
        if (res.data.success) {
          await AsyncStorage.setItem(
            "token",
            res.data.response.token,
            (e) => e && console.log(e)
          )
          // localStorage.setItem("token", res.data.response.token)
          dispatch({
            type: "LOG_IN",
            payload: {
              ...res.data.response,
              google: res.data.response.google || false,
            },
          })
          return { success: true, response: res.data.response, error: null }
        } else {
          return {
            success: false,
            error: res.data.error,
          }
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  tokenLogIn: (token) => {
    return async (dispatch) => {
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const res = await axios.get(
          "https://mytinerary-mardones.herokuapp.com/api/validate/token",
          { headers }
        )
        if (res.data.success) {
          dispatch({
            type: "LOG_IN",
            payload: { ...res.data.response, token },
          })
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error.message)
        }
      } catch (e) {
        await AsyncStorage.removeItem("token", (e) => e && console.log(e))
        dispatch({ type: "LOG_OUT" })
        return { success: false, error: e.message }
      }
    }
  },
  logOut: () => {
    return async (dispatch) => {
      await AsyncStorage.removeItem("token", (e) => e && console.log(e))
      dispatch({ type: "LOG_OUT" })
    }
  },
  getFavorites: () => {
    return async (dispatch, getState) => {
      try {
        const token = await AsyncStorage.getItem(
          "token",
          (e) => e && console.log(e)
        )
        const res = await axios.get(
          "https://mytinerary-mardones.herokuapp.com/api/itineraries/user",
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (res.data.success) {
          return { success: true, response: res.data.response, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, response: [], error: e.message }
      }
    }
  },
}

export default usersActions
