import React from 'react';
import get from 'bubble-gum-get';

import withConditionalRender from 'components/with-render';
import { useAPIPodcastDetail } from 'store/hooks';

import Header from './header';
import List from './list';

const EpisodeDetailWithConditionalRender = withConditionalRender(
  ({ state: podcast, podcastID }) => (
    <>
      <Header numberOfEpisodes={podcast.feedData.items.length} />
      <List episodes={podcast.feedData.items} podcastID={podcastID} />
    </>
  )
);

function Episodes({ podcastID }) {
  const result = useAPIPodcastDetail(
    podcastID,
    state => get(state, ['entities', 'episodes', 'byId', podcastID], {}),
    'Episodes'
  );
  console.log(result);
  return (
    <EpisodeDetailWithConditionalRender {...result} podcastID={podcastID} />
  );
}

export default Episodes;
