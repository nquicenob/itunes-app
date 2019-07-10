import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { H2, P } from 'components/texts';
import { Podcast } from 'components/cards';

function PodcastCardDetail(props) {
  return (
    <Podcast className="podcast-card-detail">
      <div className="podcast-card-detail-section">
        <img src={props.imgPath} alt={props.title} />
      </div>
      <div className="podcast-card-detail-section">
        <H2 nmarginBottom left>
          {props.title}
        </H2>
        <P italic nmarginTop left>
          {props.author}
        </P>
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

export default PodcastCardDetail;
