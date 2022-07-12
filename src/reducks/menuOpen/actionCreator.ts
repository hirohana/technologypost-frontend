/* eslint-disable @typescript-eslint/no-explicit-any*/

export const menuOpenChange = (openState: boolean): any => {
  return {
    type: 'MENUOPEN',
    payload: {
      openState: openState,
    },
  };
};
