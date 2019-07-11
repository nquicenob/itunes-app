import { useEffect } from 'react';
import get from 'bubble-gum-get';
import invariant from 'invariant';

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

const NUM_HOURS = 24;

const moreThan1Day = date => {
  invariant(!!date, 'The previous date is mandatory');
  const timeSinceLastUpdate = Date.now() - new Date(date).getTime();
  return timeSinceLastUpdate / 1000 / 60 / 60 > NUM_HOURS;
};

export const useAPIAllPodcasts = (...params) => {
  const [state, dispatch] = useStateValue();

  const fetchWrapper = async (hookParams, dispatch) => {
    try {
      dispatch(podcastsUIFetchInit());
      const prevDate = get(state, ['entities', 'podcasts', 'created']);
      if (!prevDate || moreThan1Day(prevDate)) {
        const { entities, result } = await fetchs.fetchPodcasts(...hookParams);
        dispatch(
          addEntity(entities, result, 'podcasts', new Date().toISOString())
        );
      }
      dispatch(podcastsUIFetchSuccess());
    } catch (err) {
      console.error(err);
      dispatch(podcastsUIFetchFailure());
    }
  };

  useEffect(() => {
    fetchWrapper(params, dispatch);
  }, []);

  return {
    loading: state.podcastsUI.isLoading,
    error: state.podcastsUI.isLoading,
    state: state
  };
};

export const useAPIPodcastDetail = (podcastID, selector) => {
  const [state, dispatch] = useStateValue();
  const fetchWrapper = async (podcastID, dispatch) => {
    try {
      dispatch(podcastUIFetchInit());
      const prevDate = get(state, [
        'entities',
        'episodes',
        'byId',
        podcastID,
        'created'
      ]);
      if (!prevDate || moreThan1Day(prevDate)) {
        const [{ entities, result }, origin] = await fetchs.fetchPodcatsByID(
          podcastID
        );
        const episodes = await fetchs.fetchDoc2login(origin.results[0].feedUrl);
        dispatch(
          addEntity(
            {
              ...entities,
              episodes: {
                [result[0]]: {
                  ...entities.episodes[result[0]],
                  feedData: episodes,
                  created: new Date().toISOString()
                }
              }
            },
            result,
            'episodes'
          )
        );
      }
      dispatch(podcastUIFetchSuccess());
    } catch (err) {
      console.error(err);
      dispatch(podcastUIFetchFailure());
    }
  };

  useEffect(() => {
    fetchWrapper(podcastID, dispatch);
    return () => dispatch(podcastUIFetchInit());
  }, [podcastID]);

  return {
    loading: state.podcastUI.isLoading,
    error: state.podcastUI.isLoading,
    state: selector(state)
  };
};
