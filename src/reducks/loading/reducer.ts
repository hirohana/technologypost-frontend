import * as Actions from './actions';
import { isLoadingInitialState } from '../store/initialState';
import { ACTION } from './types';

const IsLoadingReducer = (
  state = isLoadingInitialState,
  action: ACTION
): boolean => {
  switch (action.type) {
    case Actions.IS_LOADING:
      return action.payload.isLoading;
    default:
      return state;
  }
};

export { IsLoadingReducer };
