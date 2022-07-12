import * as Actions from './actions';
import { menuOpenInitialState } from '../store/initialState';
import { ACTION } from './types';

const MenuOpenReducer = (
  state = menuOpenInitialState,
  action: ACTION
): boolean => {
  switch (action.type) {
    case Actions.MENUOPEN:
      return !action.payload.openState;
    default:
      return state;
  }
};

export { MenuOpenReducer };
