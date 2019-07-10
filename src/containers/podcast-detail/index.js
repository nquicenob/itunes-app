import 'flexboxgrid';
import './index.css';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { useAPIAllPodcasts } from 'store/hooks';
import PodcastCardDetail from 'containers/podcast-card-detail';
import PodcastEpisodes from 'containers/episodes';

function PodcastDetail(props) {
  const {
    match: { params }
  } = props;
  const { loading, state } = useAPIAllPodcasts([]);

  return loading ? (
    <h1>loading</h1>
  ) : (
    <div className="row center-xs top-xs podcast-detail-container">
      <div className="col-md-4 col-xs-12 center-xs">
        <PodcastCardDetail
          title={state.entities.podcasts.byId[params.podcastID].title.label}
          description={
            state.entities.podcasts.byId[params.podcastID].summary.label
          }
          author={
            state.entities.podcasts.byId[params.podcastID]['im:artist'].label
          }
          imgPath={
            state.entities.podcasts.byId[params.podcastID]['im:image'][2].label
          }
          id={params.podcastID}
        />
      </div>
      <div className="col-md-offset-1 col-xs-offset-0 col-md-7 col-xs-12 center-xs">
        <PodcastEpisodes />
      </div>
    </div>
  );
}

export default withRouter(PodcastDetail);
