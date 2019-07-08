
import {normalize} from 'normalizr';
import {podcastsSchema} from './schemas';

const API_HOST = 'itunes.apple.com';
const API_PROTOCOL = 'https:';


async function callAPI(resource, mapper, schema) {
  const URL = `${API_PROTOCOL}//${API_HOST}/${resource}`;
  const response = await fetch(URL);
  const json = await response.json();

  if (!response.ok) {
    return Promise.reject(json)
  }

  let result = json;
  if (typeof mapper === 'function') {
    result = mapper(json);
  }

  if (schema) {
    return normalize(result, schema);
  }

  return result;
}

const podcastsMapper = (response) => {
  return response.feed.entry;
}

export function fetchPodcasts() {
  return callAPI('us/rss/toppodcasts/limit=100/genre=1310/json', podcastsMapper, [podcastsSchema]);
}


export async function fetchPodcatsByID(ID) {
  const response = await fetch(`${API_PROTOCOL}://${API_HOST}lookup?id=${ID}`);
  const json = await response.json();
  return json;
}
