import 'flexboxgrid';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import './App.css';
import Provider, { entitiesReducer, fetchReducer } from './store';
import Navbar from './containers/navbar';

const PodcastsLodable = loadable(() => import('./containers/podcasts'));
const PodcastDetailLodable = loadable(() =>
  import('./containers/podcast-detail')
);
const PodcastEpisodeDetailPageLodable = loadable(() =>
  import('./pages/podcast-episode-detail')
);

const initialState = {
  entities: {},
  podcastsUI: {
    isLoading: true
  },
  podcastUI: {
    isLoading: true
  }
};

const mainReducer = (state, action) => ({
  entities: entitiesReducer(state.entities, action),
  podcastsUI: fetchReducer(state.podcastsUI, action),
  podcastUI: fetchReducer(state.podcastUI, action)
});

// TODO: ADD 404 and progress bar
function App() {
  return (
    <div className="container-fluid wrap">
      <Router>
        <Navbar />
        <Provider initialState={initialState} reducer={mainReducer}>
          <Switch>
            <Route path="/" exact component={PodcastsLodable} />
            <Route
              path="/podcast/:podcastID"
              exact
              component={PodcastDetailLodable}
            />
            <Route
              path="/podcast/:podcastID/episode/:episodeID"
              exact
              component={PodcastEpisodeDetailPageLodable}
            />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
