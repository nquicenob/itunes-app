import 'flexboxgrid';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import './App.css';
import Provider, { entitiesReducer, makeFetchReducer } from './store';
import { saveState, getState } from './store/local-storage';
import { PODCASTS_UI, PODCAST_UI } from './store/actions';
import Navbar from './containers/navbar';
import throttle from 'lodash.throttle';

const PodcastsLodable = loadable(() => import('./containers/podcasts'));
const PodcastDetailLodable = loadable(() =>
  import('./containers/podcast-detail')
);
const PodcastEpisodesLodable = loadable(() => import('./containers/episodes'));

const PodcastEpisodeDetailPageLodable = loadable(() =>
  import('./pages/podcast-episode-detail')
);

const saveStateWithThrottle = throttle(saveState, 1000);

const initialState = {
  entities: {},
  podcastsUI: {
    isLoading: true
  },
  podcastUI: {
    isLoading: true
  }
};

const podcastsUIReducer = makeFetchReducer(PODCASTS_UI);
const podcastUIReducer = makeFetchReducer(PODCAST_UI);

const mainReducer = (state, action) => (
  saveStateWithThrottle(state),
  {
    entities: entitiesReducer(state.entities, action),
    [PODCASTS_UI]: podcastsUIReducer(state.podcastsUI, action),
    [PODCAST_UI]: podcastUIReducer(state.podcastUI, action)
  }
);

// TODO: ADD 404 and progress bar
function App() {
  return (
    <div className="container-fluid wrap">
      <Router>
        <Navbar />
        <Provider
          initialState={{ ...initialState, ...getState() }}
          reducer={mainReducer}
        >
          <Switch>
            <Route path="/" exact component={PodcastsLodable} />
            <Route
              path="/podcast/:podcastID"
              component={({ match }) => (
                <PodcastDetailLodable>
                  <Route
                    path={`${match.url}/`}
                    exact
                    component={() => (
                      <PodcastEpisodesLodable
                        podcastID={match.params.podcastID}
                      />
                    )}
                  />
                  <Route
                    path={`${match.url}/episode/:episodeID`}
                    exact
                    component={PodcastEpisodeDetailPageLodable}
                  />
                </PodcastDetailLodable>
              )}
            />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
