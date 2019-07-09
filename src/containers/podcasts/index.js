import React, { useEffect, useState, useReducer } from 'react';
import 'flexboxgrid';
import * as fetchs from 'store/api';
import PodcastCardSummary from 'containers/podcast-card-summary';

import { Entities, reducer } from 'store';
import invariant from 'invariant';

const action = (entities, result, entity) => {
  return {
    type: 'ADD_ENTITIES',
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

function useAPI(params, { fetchName, saveInStore, entity, ...rest } = {}) {
  invariant(typeof fetchName === 'string', 'options.fetchName is required');
  invariant(
    saveInStore && typeof entity === 'string',
    'options.entity is required if options.saveInStore is true'
  );

  const { state, dispatch } = Entities.useContainer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function fetchWrapper() {
    try {
      setLoading(true);
      const { entities, result } = await fetchs[fetchName]([...params], rest);
      dispatch(action(entities, result, entity));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWrapper();
  }, [...params]);

  return { loading, error, state };
}

function Podcasts() {
  const { loading, error, state } = useAPI([], {
    fetchName: 'fetchPodcasts',
    saveInStore: true,
    entity: 'podcasts'
  });

  return (
    <div className="row center-xs around-xs top-xs">
      {loading ? (
        <h1>loading</h1>
      ) : (
        state.podcasts.allIds.map((id, index) => {
          const podcast = state.podcasts.byId[id];
          return (
            <div
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
              key={`${id}-${index}`}
            >
              <PodcastCardSummary
                title={podcast.title.label}
                author={podcast['im:artist'].label}
                imgPaths={podcast['im:image']}
              />
            </div>
          );
        })
      )}
    </div>
  );
}

export default Podcasts;
