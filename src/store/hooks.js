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

import { CACHE_EXPECTED_LIFE_TIME_HOURS } from 'config';

const moreThan1Day = date => {
  invariant(!!date, 'The previous date is mandatory');
  const timeSinceLastUpdate = Date.now() - new Date(date).getTime();
  return timeSinceLastUpdate / 1000 > CACHE_EXPECTED_LIFE_TIME_HOURS;
};

export const useAPIAllPodcasts = selector => {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    let didCancel = false;
    (async dispatch => {
      try {
        dispatch(podcastsUIFetchInit());
        const prevDate = get(state, ['entities', 'podcasts', 'created']);
        if (!prevDate || moreThan1Day(prevDate)) {
          const { entities, result } = await fetchs.fetchPodcasts();
          if (!didCancel) {
            dispatch(
              addEntity(entities, result, 'podcasts', new Date().toISOString())
            );
          }
        }
        if (!didCancel) {
          dispatch(podcastsUIFetchSuccess());
        }
      } catch (err) {
        console.error(err);
        if (!didCancel) {
          dispatch(podcastsUIFetchFailure());
        }
      }
    })(dispatch);
    return () => {
      didCancel = true;
    };
  }, []);

  return {
    loading: state.podcastsUI.isLoading,
    error: state.podcastsUI.isLoading,
    state: selector(state)
  };
};

export const useAPIPodcastDetail = (podcastID, selector) => {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    let didCancel = false;
    dispatch(podcastUIFetchInit());
    (async (podcastID, dispatch) => {
      try {
        const prevDate = get(state, [
          'entities',
          'episodes',
          'byId',
          podcastID,
          'created'
        ]);
        if (!prevDate || moreThan1Day(prevDate)) {
          console.log('jajajaj');
          const [{ entities, result }, origin] = await fetchs.fetchPodcatsByID(
            podcastID
          );
          const episodes = await fetchs.fetchRSS(origin.results[0].feedUrl);
          if (!didCancel) {
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
        }
        if (!didCancel) {
          dispatch(podcastUIFetchSuccess());
        }
      } catch (err) {
        console.error(err);
        if (!didCancel) {
          dispatch(podcastUIFetchFailure());
        }
      }
    })(podcastID, dispatch);
    return () => {
      didCancel = true;
      dispatch(podcastUIFetchInit());
    };
  }, [podcastID]);

  return {
    loading: state.podcastUI.isLoading,
    error: state.podcastUI.isLoading,
    state: selector(state)
  };
};
