import axios from "axios"

const userActions = {
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
  logOut: () => {
    return async (dispatch) => {
      dispatch({ type: "LOG_OUT" })
    }
  },
}

export default userActions
