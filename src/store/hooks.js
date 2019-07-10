import { useEffect } from 'react';
// import invariant from 'invariant';

import { useStateValue } from './index';
import * as fetchs from './api';

import {
  addEntity,
  podcastsUIFetchInit,
  podcastsUIFetchSuccess,
  podcastsUIFetchFailure,
  podcastUIFetchInit,
  podcastUIFetchSuccess,
  podcastUIFetchFailure
} from './actions';

export const useAPIAllPodcasts = (...params) => {
  const fetchWrapper = async (hookParams, dispatch) => {
    try {
      dispatch(podcastsUIFetchInit());
      const { entities, result } = await fetchs.fetchPodcasts(...hookParams);
      dispatch(addEntity(entities, result, 'podcasts'));
      dispatch(
        podcastsUIFetchSuccess({ onComplete: new Date().toISOString() })
      );
    } catch (err) {
      console.error(err);
      dispatch(podcastsUIFetchFailure());
    }
  };

  const [state, dispatch] = useStateValue();
  useEffect(() => {
    fetchWrapper(params, dispatch);
  }, []);

  return {
    loading: state.podcastsUI.isLoading,
    error: state.podcastsUI.isLoading,
    state: state
  };
};

export const useAPIPodcastDetail = podcastID => {
  const fetchWrapper = async (podcastID, dispatch) => {
    try {
      dispatch(podcastUIFetchInit());
      const { entities, result } = await fetchs.fetchPodcatsByID(podcastID);
      dispatch(addEntity(entities, result, 'episodes'));
      dispatch(podcastUIFetchSuccess());
    } catch (err) {
      console.error(err);
      dispatch(podcastUIFetchFailure());
    }
  };

  const [state, dispatch] = useStateValue();
  useEffect(() => {
    fetchWrapper(podcastID, dispatch);
  }, [podcastID]);

  return {
    loading: state.podcastUI.isLoading,
    error: state.podcastUI.isLoading,
    state: state
  };
};
