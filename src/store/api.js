import { normalize } from 'normalizr';
import fetchJSONP from 'fetch-jsonp';
import RSSParser from 'rss-parser';
import { podcastsSchema, podcastEpisodesSchema } from './schemas';

const parser = new RSSParser();

const PUBLIC_API_HOST = 'itunes.apple.com';
const PUBLIC_API_PROTOCOL = 'https:';

const PRIVATE_API_HOST = 'amp-api.podcasts.apple.com';
const PRIVATE_API_PROTOCOL = 'https:';

const CORS_PROXY_HOST = 'crossorigin.me';
const CORS_PROXY_PROTOCOL = 'https:';

async function callAPI(resource, mapper, schema) {
  const URL = `${PUBLIC_API_PROTOCOL}//${PUBLIC_API_HOST}/${resource}`;
  // const URL = `${CORS_PROXY_PROTOCOL}//${CORS_PROXY_HOST}/${PUBLIC_API_PROTOCOL}//${PUBLIC_API_HOST}/${resource}`; //
  // https://cors-anywhere.herokuapp.com/

  const response = await fetch(URL);
  const json = await response.json();

  if (!response.ok) {
    return Promise.reject(json);
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

async function callAPIJSONP(resource, mapper, schema) {
  const URL = `${PUBLIC_API_PROTOCOL}//${PUBLIC_API_HOST}/${resource}`;

  const response = await fetchJSONP(URL);
  const json = await response.json();

  if (!response.ok) {
    return Promise.reject(json);
  }

  let result = json;
  if (typeof mapper === 'function') {
    result = mapper(json);
  }

  if (schema) {
    return [normalize(result, schema), json];
  }

  return [result, json];
}

const podcastsMapper = response => {
  return response.feed.entry;
};

export function fetchPodcasts() {
  return callAPI(
    'us/rss/toppodcasts/limit=100/genre=1310/json',
    podcastsMapper,
    [podcastsSchema]
  );
}

export function fetchPodcatsByID(ID) {
  return callAPIJSONP(
    `lookup?id=${ID}`,
    ({ results }) => results.map(result => ({ ...result, __id: ID })),
    [podcastEpisodesSchema]
  );
}

export async function fetchDoc2login(place) {
  const response = await fetch('https://cors-anywhere.herokuapp.com/' + place);
  const txt = await response.text();
  const result = parser.parseString(txt);
  return result;
}
