type USER_INITIAL_STATE = {
  uid: string;
  photoUrl: string;
  displayName: string;
};

type USER_STATE = {
  type: string;
  payload: USER_INITIAL_STATE;
};

export type { USER_INITIAL_STATE, USER_STATE };
