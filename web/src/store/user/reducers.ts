import { UserState, SET_USER, UserActionTypes } from "./types"

const initialState: UserState = {
  id: 0,
  email: "test@test.com"
}

export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload
      }
    default:
      return state
  }
}
