export const ADD_ENTITY = 'ADD_ENTITIES';

export const FETCH_INIT = 'FETCH_INIT';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const FETCH_FAILURE = 'FETCH_FAILURE';

export const addEntity = (entities, result, entity) => {
  return {
    type: ADD_ENTITY,
    payload: {
      [entity]: {
        byId: {
          ...entities[entity]
        },
        allIds: result
      }
    }
  };
};

export const fetchInit = () => ({ type: FETCH_INIT });

export const fetchSuccess = payload => ({ type: FETCH_SUCCESS, payload });

export const fetchFailure = () => ({ type: FETCH_FAILURE });
