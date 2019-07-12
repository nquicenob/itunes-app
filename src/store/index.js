import React, { createContext, useContext, useReducer } from 'react';
import merge from 'lodash.merge';

import {
  ADD_ENTITY,
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  PODCASTS_UI,
  PODCAST_UI
} from './actions';

import { getState, saveStateWithThrottle } from './local-storage';

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

export const podcastsUIReducer = makeFetchReducer(PODCASTS_UI);
export const podcastUIReducer = makeFetchReducer(PODCAST_UI);

export const mainReducer = (state, action) => (
  // eslint-disable-next-line no-sequences
  saveStateWithThrottle(state),
  {
    entities: entitiesReducer(state.entities, action),
    [PODCASTS_UI]: podcastsUIReducer(state.podcastsUI, action),
    [PODCAST_UI]: podcastUIReducer(state.podcastUI, action)
  }
);

export const initialState = {
  entities: {},
  podcastsUI: {
    isLoading: true
  },
  podcastUI: {
    isLoading: true
  },
  ...getState()
};

export default StateProvider;
