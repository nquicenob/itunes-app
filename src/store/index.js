import React, { createContext, useContext, useReducer } from 'react';
import merge from 'lodash.merge';

import {
  ADD_ENTITY,
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from './actions';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export function entitiesReducer(state, action) {
  switch (action.type) {
    case ADD_ENTITY:
      return merge({}, state, action.payload);
    default:
      return state;
  }
}

export const makeFetchReducer = UI =>
  function fetchReducer(state, action) {
    switch (action.type) {
      case `${UI}_${FETCH_INIT}`:
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case `${UI}_${FETCH_SUCCESS}`:
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload
        };
      case `${UI}_${FETCH_FAILURE}`:
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      default:
        return state;
    }
  };

export default StateProvider;
