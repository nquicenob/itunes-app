import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import { H2, P } from 'components/texts';
import { Podcast } from 'components/cards';

import './podcast-card-summary.css';

function PodcastCardSummary(props) {
  const { title, author, imgPath, id } = props;
  return (
    <Link className="no-styles" to={`/podcast/${id}`}>
      <Podcast className="podcast-card-summary">
        <LazyLoad height={150}>
          <img className="img" src={imgPath} alt={title} />
        </LazyLoad>
        <H2 upper lnhigth>
          {title}
        </H2>
        <P>Author: {author}</P>
      </Podcast>
    </Link>
  );
}

PodcastCardSummary.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired
};

export default PodcastCardSummary;
