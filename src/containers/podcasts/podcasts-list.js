import 'flexboxgrid';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import PodcastCardSummary from 'containers/podcast-card-summary';

const filterIds = (needle, id, byId) => {
  const ele = byId[id];
  const title = ele.title.label;
  const artist = ele['im:artist'].label;
  return (
    title.toLocaleLowerCase().includes(needle) ||
    artist.toLocaleLowerCase().includes(needle)
  );
};

export function PodcastsList(props) {
  const { podcasts, location } = props;
  const qs = queryString.parse(location.search);
  const needle = (qs.q || '').toLocaleLowerCase();
  const podcastIds = useMemo(
    () => podcasts.allIds.filter(id => filterIds(needle, id, podcasts.byId)),
    [needle, podcasts.allIds, podcasts.byId]
  );

  return (
    <div className="row center-xs around-xs top-xs">
      {podcastIds.map((id, index) => {
        const podcast = podcasts.byId[id];
        return (
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            key={`${id}-${index}`}
          >
            <PodcastCardSummary
              title={podcast.title.label}
              author={podcast['im:artist'].label}
              imgPaths={podcast['im:image']}
            />
          </div>
        );
      })}
    </div>
  );
}

PodcastsList.propTypes = {
  podcasts: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(PodcastsList);
