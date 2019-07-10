import 'flexboxgrid';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

import PodcastCardSummary from 'containers/podcast-card-summary';

const PodcastCardSummaryMemo = PodcastCardSummary;

export function PodcastsList(props) {
  const { podcasts, podcastIds } = props;
  return (
    <div className="row center-xs around-xs top-xs">
      {podcastIds.map((id, index) => {
        const podcast = podcasts[id];
        return (
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            key={`${id}-${index}`}
          >
            <PodcastCardSummaryMemo
              title={podcast.title.label}
              author={podcast['im:artist'].label}
              imgPath={podcast['im:image'][2].label}
              id={id}
            />
          </div>
        );
      })}
    </div>
  );
}

PodcastsList.propTypes = {
  podcasts: PropTypes.object.isRequired,
  podcastIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default memo(PodcastsList);
