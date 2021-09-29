const usersReducer = (state = { user: false }, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.payload,
      }
    case "LOG_OUT":
      return {
        ...state,
        user: false,
      }
    default:
      return state
  }
}

export default usersReducer
