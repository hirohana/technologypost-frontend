// user情報の初期値
import { USER_INITIAL_STATE } from 'reducks/user/types';

const initialState: USER_INITIAL_STATE = {
  uid: '',
  photoUrl: '',
  displayName: '',
};

// menuOpenStateの初期値
const menuOpenInitialState = false;

export { initialState, menuOpenInitialState };
