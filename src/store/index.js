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

export function fetchReducer(state, action) {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export default StateProvider;

// const ApppContext = React.createContext(
//   /* optional default value */
// );
// const App = props => (
//   <ApppContext.Provider value={{ primaryColor: green }}>
//     {props.children}
//   </ApppContext.Provider>
// );

// export default App;

// import { useReducer } from 'react';
// import merge from 'lodash.merge';
// import { createContainer } from 'unstated-next';

// export function reducer(state, action) {
//   if (action.payload && action.payload) {
//     return merge({}, state, action.payload);
//   }
//   return state;
// }

// function useEntities(initialState = {}) {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return { state, dispatch };
// }

// export const Entities = createContainer(useEntities);
