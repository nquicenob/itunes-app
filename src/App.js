import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import 'flexboxgrid';

import { Entities } from './store';

import './App.css';
import Navbar from './containers/navbar';

const PodcastsLodable = loadable(() => import('./containers/podcasts'));
const PodcastDetailLodable = loadable(() =>
  import('./containers/podcast-detail')
);
const PodcastEpisodeDetailPageLodable = loadable(() =>
  import('./pages/podcast-episode-detail')
);

// TODO: ADD 404 and progress bar
function App() {
  return (
    <div className="container-fluid wrap">
      <Router>
        <Navbar />
        <Entities.Provider>
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
        </Entities.Provider>
      </Router>
    </div>
  );
}

export default App;
