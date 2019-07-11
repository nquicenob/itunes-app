import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Podcast, Section } from 'components/cards';
import { H1, P } from 'components/texts';

function EpisodeDetail(props) {
  return (
    <Podcast className="wrapper--episode-detail">
      <H1 left>{props.title}</H1>
      <Section borderBottom>
        <P left dangerouslySetInnerHTML={{ __html: props.content }} />
      </Section>
      <Section padding10>
        <audio controls>
          <source src={props.enclosure.url} type={props.enclosure.type} />
        </audio>
      </Section>
    </Podcast>
  );
}

EpisodeDetail.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default EpisodeDetail;
