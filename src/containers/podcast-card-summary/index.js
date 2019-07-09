import React from 'react';
import PropTypes from 'prop-types';

import './podcast-card-summary.css';

function PodcastCardSummary(props) {
  const { title, author, imgPaths } = props;
  return (
    <div className="card">
      <img className="img" src={imgPaths[2].label} alt={title} />
      <h2 className="title">{title}</h2>
      <p className="p">{author}</p>
    </div>
  );
}

PodcastCardSummary.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imgPaths: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.shape({
        height: PropTypes.string.isRequired
      }),
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PodcastCardSummary;
