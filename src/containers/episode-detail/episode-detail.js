import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Podcast, Section } from 'components/cards';
import { H1, P } from 'components/texts';

function EpisodeDetail({ state: data }) {
  return (
    <Podcast className="wrapper--episode-detail">
      <H1 left>{data.title}</H1>
      <Section borderBottom>
        <P left dangerouslySetInnerHTML={{ __html: data.content }} />
      </Section>
      <Section padding10>
        <audio controls>
          <source src={data.enclosure.url} type={data.enclosure.type} />
        </audio>
      </Section>
    </Podcast>
  );
}

EpisodeDetail.propTypes = {
  state: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    enclosure: PropTypes.object
  }).isRequired
};

export default EpisodeDetail;
