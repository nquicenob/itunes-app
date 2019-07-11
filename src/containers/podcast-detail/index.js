import 'flexboxgrid';
import './index.css';
import React from 'react';
import { withRouter } from 'react-router-dom';

import PodcastCardDetail from 'containers/podcast-card-detail';

function PodcastDetail(props) {
  const {
    match: { params },
    children
  } = props;

  return (
    <div className="row center-xs top-xs podcast-detail-container">
      <div className="col-md-4 col-xs-12 center-xs">
        <PodcastCardDetail podcastID={params.podcastID} />
      </div>
      <div className="col-md-8 col-xs-12 center-xs">{children}</div>
    </div>
  );
}

export default withRouter(PodcastDetail);
