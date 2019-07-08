

import {schema} from 'normalizr';

export const podcastsSchema = new schema.Entity('podcasts', undefined, {
  idAttribute: (value) => value.id.attributes['im:id'],
});
