export const ADD_ENTITY = 'ADD_ENTITIES';

export const FETCH_INIT = 'FETCH_INIT';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const FETCH_FAILURE = 'FETCH_FAILURE';

export const PODCASTS_UI = 'podcastsUI';

export const PODCAST_UI = 'podcastUI';

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

export const makeFetchInit = UI => () => ({ type: `${UI}_${FETCH_INIT}` });

export const makeFetchSuccess = UI => payload => ({
  type: `${UI}_${FETCH_SUCCESS}`,
  payload
});

export const makeFetchFailure = UI => () => ({
  type: `${UI}_${FETCH_FAILURE}`
});

export const podcastsUIFetchInit = makeFetchInit(PODCASTS_UI);

export const podcastsUIFetchSuccess = makeFetchSuccess(PODCASTS_UI);

export const podcastsUIFetchFailure = makeFetchFailure(PODCASTS_UI);

export const podcastUIFetchInit = makeFetchInit(PODCAST_UI);

export const podcastUIFetchSuccess = makeFetchSuccess(PODCAST_UI);

export const podcastUIFetchFailure = makeFetchFailure(PODCAST_UI);
