/* eslint-disable @typescript-eslint/no-explicit-any*/

import { ACTION } from './types';

export const isLoading = (isLoading: boolean): ACTION => {
  return {
    type: 'IS_LOADING',
    payload: {
      isLoading,
    },
  };
};
