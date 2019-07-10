import React from 'react';

import Header from './header';
import List from './list';

import { useAPIPodcastDetail } from 'store/hooks';

function Episodes(props) {
  const { loading, state } = useAPIPodcastDetail(props.podcastID);

  return loading ? (
    <h1>loading</h1>
  ) : (
    <>
      <Header numberOfEpisodes={state.entities.episodes.allIds.length} />
      <List
        episodesAllIds={state.entities.episodes.allIds}
        episodes={state.entities.episodes.byId}
      />
    </>
  );
}

export default Episodes;
