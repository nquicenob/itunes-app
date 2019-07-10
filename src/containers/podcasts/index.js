import 'flexboxgrid';

import React, { useState, useMemo } from 'react';
// import { withRouter } from 'react-router-dom';
// import queryString from 'query-string';
// import { Entities, reducer } from 'store';
// import invariant from 'invariant';

import { useAPIAllPodcasts } from 'store/hooks';

import PodcastList from './podcasts-list';
import FilterInput from './filter-input';

export const filterIds = (needle, id, byId) => {
  if (needle === '') {
    return true;
  }
  const ele = byId[id];
  const title = ele.title.label;
  const artist = ele['im:artist'].label;
  return (
    title.toLocaleLowerCase().includes(needle) ||
    artist.toLocaleLowerCase().includes(needle)
  );
};

const Podcasts = props => {
  const [value, setState] = useState('');
  const { podcasts } = props;
  const podcastIds = useMemo(
    () => podcasts.allIds.filter(id => filterIds(value, id, podcasts.byId)),
    [value, podcasts.allIds, podcasts.byId]
  );

  return (
    <>
      <FilterInput
        podcastCount={podcastIds.length}
        value={value}
        onChange={setState}
      />
      <PodcastList podcasts={podcasts.byId} podcastIds={podcastIds} />
    </>
  );
};

function PodcastsLoable() {
  const { loading, state } = useAPIAllPodcasts();
  return loading ? (
    <h1>loading</h1>
  ) : (
    <Podcasts podcasts={state.entities.podcasts} />
  );
}

export default PodcastsLoable;
