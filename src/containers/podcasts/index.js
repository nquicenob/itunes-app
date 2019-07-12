import 'flexboxgrid';

import React, { useState, useMemo } from 'react';
import get from 'bubble-gum-get';

import { useAPIAllPodcasts } from 'store/hooks';
import withConditionalRender from 'components/with-render';

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
  const { state: podcasts } = props;
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

const PodcastsWithConditionalRender = withConditionalRender(Podcasts);

function PodcastsLoable() {
  const result = useAPIAllPodcasts(state =>
    get(state, ['entities', 'podcasts'])
  );
  return <PodcastsWithConditionalRender {...result} />;
}

export default PodcastsLoable;
