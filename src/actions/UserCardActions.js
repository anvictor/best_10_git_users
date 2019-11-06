import * as types from '../constants/actions';

export const refreshAndShowUserCard = (user) => {
  return {type: types.REFRESH_AND_SHOW_USER_CARD, payload: user}
};
export const hideUserCard = () => {
  return {type: types.HIDE_USER_CARD}
};
