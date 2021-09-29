import axios from "axios"

const citiesActions = {
  getCities: () => {
    return async (dispatch) => {
      try {
        const res = await axios.get(
          "https://mytinerary-mardones.herokuapp.com/api/cities"
        )
        if (!res.data.response) throw new Error(res.data.error)
        dispatch({ type: "GET_ALL_CITIES", payload: res.data.response })
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default citiesActions
