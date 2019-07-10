import { useEffect } from 'react';
import invariant from 'invariant';

import { useStateValue } from './index';
import * as fetchs from './api';

import { addEntity, fetchInit, fetchSuccess, fetchFailure } from './actions';

export const makeUseAPI = (fetchAPI, entity) => params => {
  invariant(typeof fetchAPI === 'function', 'options.fetchName is required');
  invariant(typeof entity === 'string', 'options.entity is required');

  const [state, dispatch] = useStateValue();

  async function fetchWrapper() {
    try {
      dispatch(fetchInit());
      const { entities, result } = await fetchAPI(...params);
      dispatch(addEntity(entities, result, entity));
      dispatch(fetchSuccess(new Date().toISOString()));
    } catch (err) {
      dispatch(fetchFailure());
    }
  }

  useEffect(() => {
    fetchWrapper();
  }, [...params]);

  return {
    loading: state.podcastsUI.isLoading,
    error: state.podcastsUI.isLoading,
    state: state
  };
};

export const useAPIAllPodcasts = makeUseAPI(fetchs.fetchPodcasts, 'podcasts');
