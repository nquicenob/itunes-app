import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import get from 'bubble-gum-get';
import { useAPIPodcastDetail } from 'store/hooks';

import EpisodeDetail from './episode-detail';

function EpisodeDetailLodable(props) {
  const { match, podcastID } = props;
  const episodeID = match.params.episodeID;
  const { loading, state: episode } = useAPIPodcastDetail(
    props.podcastID,
    state =>
      get(
        state,
        [
          'entities',
          'episodes',
          'byId',
          podcastID,
          'feedData',
          'items',
          episodeID
        ],
        {}
      )
  );
  return loading ? <h1>loading</h1> : <EpisodeDetail {...episode} />;
}

EpisodeDetailLodable.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  podcastID: PropTypes.string.isRequired
};

export default withRouter(EpisodeDetailLodable);
