const itinerariesReducer = (
  state = { itineraries: [], comments: [], activities: [] },
  action
) => {
  switch (action.type) {
    case "GET_CITY_ITINERARIES":
      return {
        ...state,
        itineraries: [...state.itineraries, ...action.payload],
      }
    case "ON_DELETE_ACCOUNT":
      return {
        ...state,
        comments: state.comments?.filter(
          (c) => c.userId._id !== action.payload
        ),
        itineraries: state.itineraries.map((i) => {
          return {
            ...i,
            likes: i.likes?.filter((uid) => uid !== action.payload),
          }
        }),
      }
    case "ADD_LIKE":
      return {
        ...state,
        itineraries: state.itineraries.map((i) =>
          i._id === action.payload.itinerary._id
            ? { ...i, likes: action.payload.itinerary.likes }
            : i
        ),
      }
    case "REMOVE_LIKE":
      return {
        ...state,
        itineraries: state.itineraries.map((i) =>
          i._id === action.payload.itinerary._id
            ? {
                ...i,
                likes: action.payload.itinerary.likes,
              }
            : i
        ),
      }
    case "GET_COMMENTS":
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
      }
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      }
    case "REMOVE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter((c) => c._id !== action.payload),
      }
    case "UPDATE_COMMENT":
      return {
        ...state,
        comments: state.comments.map((c) => {
          if (c._id === action.payload._id) {
            return { ...c, content: action.payload.content }
          }
          return c
        }),
      }
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: [...state.activities, ...action.payload],
      }
    default:
      return state
  }
}

export default itinerariesReducer
