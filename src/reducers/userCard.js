import InitialState from '../constants/initialState';
import * as types from '../constants/actions';

export default function refillReducer(state = {
  isCardVisible: InitialState.isCardVisible,
  userCard: InitialState.userCard
}, action) {

  switch (action.type) {

    case types.REFRESH_AND_SHOW_USER_CARD:
      return {...state, isCardVisible: true};
    case types.HIDE_USER_CARD:
      return {...state, isCardVisible: false};

    default:
      return state
  }
}


