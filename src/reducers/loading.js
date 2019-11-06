
import InitialState from '../constants/initialState';
import * as types from '../constants/actions';

export default function refillReducer(state = InitialState, action) {

  switch (action.type) {

    case types.SHOW_LOADING: return {...state, loading: true };
    case types.HIDE_LOADING: return {...state, loading: false};


    default:
      return state
  }
}


