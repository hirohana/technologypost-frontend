import { LOGIN, LOGOUT, UPDATE_PROFILE } from "./actions";
import { USER_INITIAL_STATE, USER_STATE } from "./types";

const login = (userState: USER_INITIAL_STATE): USER_STATE => {
  return {
    type: LOGIN,
    payload: {
      uid: userState.uid,
      photoUrl: userState.photoUrl,
      displayName: userState.displayName,
    },
  };
};

const logout = (): USER_STATE => {
  return {
    type: LOGOUT,
    payload: {
      uid: "",
      photoUrl: "",
      displayName: "",
    },
  };
};

const updateProfile = (userState: USER_INITIAL_STATE): USER_STATE => {
  return {
    type: UPDATE_PROFILE,
    payload: {
      uid: userState.uid,
      photoUrl: userState.photoUrl,
      displayName: userState.displayName,
    },
  };
};

export { login, logout, updateProfile };
