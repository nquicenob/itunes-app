import 'flexboxgrid';
import React, { Suspense, useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazy } from '@loadable/component';

import './App.css';
import Provider, { mainReducer, initialState } from './store';
import Navbar from './containers/navbar';
import Fallback from './containers/navbar/fallback';
import ScrollToTop from './containers/scroll-2-top';
import PodcastDetailLodable from './containers/podcast-detail';

const PodcastsLodable = lazy(() => import('./containers/podcasts'));
const PodcastEpisodesLodable = lazy(() => import('./containers/episodes'));
const PodcastEpisodeDetailPageLodable = lazy(() =>
  import('./containers/episode-detail')
);

// TODO: ADD 404 and progress bar
function App() {
  const [value, setLoading] = useState(false);
  return (
    <div className="container-fluid wrap">
      <Router>
        <ScrollToTop />
        <Provider initialState={{ ...initialState }} reducer={mainReducer}>
          <Navbar loading={value} />
          <Suspense fallback={<Fallback setLoading={setLoading} />}>
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
                      component={props => (
                        <PodcastEpisodeDetailPageLodable
                          {...props}
                          podcastID={match.params.podcastID}
                        />
                      )}
                    />
                  </PodcastDetailLodable>
                )}
              />
            </Switch>
          </Suspense>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
