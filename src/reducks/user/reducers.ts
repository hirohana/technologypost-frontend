import * as Actions from "./actions";
import { initialState } from "../store/initialState";
import { USER_STATE } from "./types";

const UsersReducer = (state = initialState, action: USER_STATE) => {
  switch (action.type) {
    case Actions.LOGIN:
    case Actions.UPDATE_PROFILE:
      return { ...state, ...action.payload };
    case Actions.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export { UsersReducer };
