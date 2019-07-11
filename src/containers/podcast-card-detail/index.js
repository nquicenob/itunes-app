import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  const { loading, state } = useAPIAllPodcasts();
  return loading ? (
    <h1>loading</h1>
  ) : (
    <PodcastCardDetail
      title={state.entities.podcasts.byId[podcastID].title.label}
      description={state.entities.podcasts.byId[podcastID].summary.label}
      author={state.entities.podcasts.byId[podcastID]['im:artist'].label}
      imgPath={state.entities.podcasts.byId[podcastID]['im:image'][2].label}
      id={podcastID}
    />
  );
}

export default PodcastCardDetailLoable;
