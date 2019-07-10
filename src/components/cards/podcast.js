import React from 'react';
import PropTypes from 'prop-types';
import './cards.css';

const Podcast = props => {
  return (
    <div className={`card-podcast ${props.className}`}>{props.children}</div>
  );
};

Podcast.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Podcast;
