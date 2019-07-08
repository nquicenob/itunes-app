
import {useReducer} from 'react';
import merge from 'lodash.merge'
import {createContainer} from 'unstated-next';



export function reducer(state, action) {
  if (action.payload && action.payload) {
    return merge({}, state, action.payload)
  }
  return state
}

function useEntities(initialState = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {state, dispatch};
}

export const Entities = createContainer(useEntities)

