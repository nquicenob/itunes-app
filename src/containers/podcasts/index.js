
import React, {useEffect, useState, useReducer} from 'react';
import 'flexboxgrid';
import * as fetchs from 'store/api';


import { Entities, reducer } from 'store';
import invariant from 'invariant';

const action = (entities, result, entity) => {
  return {
    type: 'ADD_ENTITIES',
    payload: {
      [entity]: {
        byId: {
          ...entities[entity],
        },
        allIds : result,
      }
    }
  };
};

function useAPI(params,  {
  fetchName,
  saveInStore,
  entity,
  ...rest
} = {}) {
  invariant((typeof fetchName === 'string'), 'options.fetchName is required');
  invariant((saveInStore && typeof entity === 'string'), 'options.entity is required if options.saveInStore is true');

  const {state, dispatch} = Entities.useContainer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function fetchWrapper() {
    try {
      setLoading(true);
      const {entities, result} = await fetchs[fetchName]([...params], rest);
      dispatch(action(entities, result, entity));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {fetchWrapper()}, [...params]);

  return {loading, error, state};
}


function Podcasts() {
  const {loading, error, state} = useAPI([], {
    fetchName: 'fetchPodcasts',
    saveInStore: true,
    entity: 'podcasts',
  });

  return (
    <div>
      {loading ? <h1>loading</h1> : (
        state.podcasts.allIds.map((id, key) => {
          return (
            <div key={id}>
              <h1>{state.podcasts.byId[id]['im:name'].label}</h1>
            </div>
          );
        })
      )}
    </div>
  )
}



export default Podcasts;

