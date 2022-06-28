// import { USER_INITIAL_STATE } from "./types";
type USER_INITIAL_STATE = {
  user: {
    uid: string;
    photoUrl: string;
    displayName: string;
  };
};
export const selectUser = (state: USER_INITIAL_STATE) => state;
