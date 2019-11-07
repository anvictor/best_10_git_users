import * as types from '../constants/actions';

export const refreshUserCard = (user) => {
  return {type: types.REFRESH_USER_CARD, payload: user}
};


