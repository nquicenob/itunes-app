import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import get from 'bubble-gum-get';

import { H2, P } from 'components/texts';
import { Podcast } from 'components/cards';

import { useAPIAllPodcasts } from 'store/hooks';

function PodcastCardDetail(props) {
  return (
    <Podcast className="podcast-card-detail">
      <div className="podcast-card-detail-section">
        <Link to={`/podcast/${props.id}`}>
          <img src={props.imgPath} alt={props.title} />
        </Link>
      </div>
      <div className="podcast-card-detail-section">
        <Link className="link" to={`/podcast/${props.id}`}>
          <H2 nmarginBottom left>
            {props.title}
          </H2>
          <P italic nmarginTop left>
            {props.author}
          </P>
        </Link>
      </div>
      <div>
        <P left bold>
          Description:
        </P>
        <P left italic>
          {props.description}
        </P>
      </div>
    </Podcast>
  );
}

PodcastCardDetail.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired
};

function PodcastCardDetailLoable({ podcastID }) {
  const { loading, state: podcast } = useAPIAllPodcasts(state =>
    get(state, ['entities', 'podcasts', 'byId', podcastID], {})
  );
  return loading ? (
    <h1>loading</h1>
  ) : (
    <PodcastCardDetail
      title={podcast.title.label}
      description={podcast.summary.label}
      author={podcast['im:artist'].label}
      imgPath={podcast['im:image'][2].label}
      id={podcastID}
    />
  );
}

export default PodcastCardDetailLoable;
