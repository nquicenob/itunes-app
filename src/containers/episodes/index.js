import React from 'react';
import get from 'bubble-gum-get';
import Header from './header';
import List from './list';

import { useAPIPodcastDetail } from 'store/hooks';

function Episodes(props) {
  const { loading, state: podcast } = useAPIPodcastDetail(
    props.podcastID,
    state => get(state, ['entities', 'episodes', 'byId', props.podcastID], {})
  );
  return loading ? (
    <h1>loading</h1>
  ) : (
    <>
      <Header numberOfEpisodes={podcast.feedData.items.length} />
      <List episodes={podcast.feedData.items} podcastID={props.podcastID} />
    </>
  );
}

export default Episodes;
