import 'flexboxgrid';

import React, { useEffect, useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import * as fetchs from 'store/api';

import { Entities, reducer } from 'store';
import invariant from 'invariant';

import PodcastList from './podcasts-list';
import FilterInput from './filter-input';

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

export const filterIds = (needle, id, byId) => {
  if (needle === '') {
    return true;
  }
  const ele = byId[id];
  const title = ele.title.label;
  const artist = ele['im:artist'].label;
  return (
    title.toLocaleLowerCase().includes(needle) ||
    artist.toLocaleLowerCase().includes(needle)
  );
};

const Podcasts = props => {
  const [value, setState] = useState('');
  const { podcasts } = props;
  const podcastIds = useMemo(
    () => podcasts.allIds.filter(id => filterIds(value, id, podcasts.byId)),
    [value, podcasts.allIds, podcasts.byId]
  );

  return (
    <>
      <FilterInput
        podcastCount={podcastIds.length}
        value={value}
        onChange={setState}
      />
      <PodcastList podcasts={podcasts.byId} podcastIds={podcastIds} />
    </>
  );
};

function PodcastsLoable() {
  const { loading, state } = useAPI([], {
    fetchName: 'fetchPodcasts',
    saveInStore: true,
    entity: 'podcasts'
  });

  return loading ? <h1>loading</h1> : <Podcasts podcasts={state.podcasts} />;
}

export default PodcastsLoable;
