import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import get from 'bubble-gum-get';
import { useAPIPodcastDetail } from 'store/hooks';
import withConditionalRender from 'components/with-render';

import EpisodeDetail from './episode-detail';

const EpisodeDetailWithConditionalRender = withConditionalRender(EpisodeDetail);

function EpisodeDetailLodable(props) {
  const { match, podcastID } = props;
  const episodeID = match.params.episodeID;
  const result = useAPIPodcastDetail(props.podcastID, state =>
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
  return <EpisodeDetailWithConditionalRender {...result} />;
}

EpisodeDetailLodable.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  podcastID: PropTypes.string.isRequired
};

export default withRouter(EpisodeDetailLodable);
