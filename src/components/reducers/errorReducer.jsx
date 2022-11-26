import { GET_ERRORS, CLEAR_ERRORRS } from "../actions/actionTypes"

const initialState = {
  msg: {},
  status: null,
  id: null,
}

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      }
    case CLEAR_ERRORRS:
      return {
        msg: {},
        status: null,
        id: null,
      }
    default:
      return state
  }
}
