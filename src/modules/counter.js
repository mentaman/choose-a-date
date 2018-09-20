export const SET_USER = 'counter/INCREMENT'

const initialState = {
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action.user);
      return {
        ...state,
        user: action.user
      }

    default:
      return state
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: SET_USER,
      user
    })
  }
}
