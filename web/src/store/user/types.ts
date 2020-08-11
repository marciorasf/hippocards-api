export interface UserState {
  id: number;
  email: string;
}

export const SET_USER = 'SET_USER'

interface SetUserAction {
  type: typeof SET_USER
  payload: UserState
}


export type UserActionTypes = SetUserAction
