import InitialState from '../constants/initialState';
import * as types from '../constants/actions';

export default function userCardReducers(state = {
  userCard: InitialState.userCard,
}, action) {

  switch (action.type) {

    case types.REFRESH_USER_CARD:
      return {...state, userCard: action.payload };
    default:
      return state
  }
}


