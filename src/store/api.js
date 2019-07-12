import { normalize } from 'normalizr';
import fetchJSONP from 'fetch-jsonp';
import RSSParser from 'rss-parser';
import { podcastsSchema, podcastEpisodesSchema } from './schemas';
import {
  PUBLIC_API_HOST,
  PUBLIC_API_PROTOCOL,
  PROXY_PROTOCOL,
  PROXY_HOST,
  PROXY_PORT
} from 'config';

const parser = new RSSParser();

async function callAPI(
  resource,
  mapper,
  schema,
  { jsonp = false, original = false } = {}
) {
  const URL = `${PUBLIC_API_PROTOCOL}//${PUBLIC_API_HOST}/${resource}`; // https://cors-anywhere.herokuapp.com/
  let response;
  if (jsonp) {
    response = await fetchJSONP(URL);
  } else {
    response = await fetch(URL);
  }

  const json = await response.json();
  if (!response.ok) {
    return Promise.reject(json);
  }

  let result = json;
  if (typeof mapper === 'function') {
    result = mapper(json);
  }

  if (original) {
    return !!schema ? [normalize(result, schema), json] : [result, json];
  }
  return !!schema ? normalize(result, schema) : result;
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
  return callAPI(
    `lookup?id=${ID}`,
    ({ results }) => results.map(result => ({ ...result, __id: ID })),
    [podcastEpisodesSchema],
    {
      jsonp: true,
      original: true
    }
  );
}

export async function fetchRSS(place) {
  const response = await fetch(
    `${PROXY_PROTOCOL}//${PROXY_HOST}:${PROXY_PORT}/` + place
  );
  const res = await response.text();
  const result = await parser.parseString(res);

  let max = 6;
  let counter = 0;
  for (const item of result.items) {
    counter++;
    let audio = new Audio();
    audio.preload = 'metadata';
    audio.src = item.enclosure.url;
    audio.type = item.enclosure.type;
    const ok = await Promise.race([
      new Promise(resolve => {
        const listenerSave = () => {
          const minutes = parseInt(audio.duration / 60, 10);
          const seconds = parseInt(audio.duration % 60);
          audio.removeEventListener('loadedmetadata', listenerSave);
          audio.src = null;
          item.minutes = minutes;
          item.seconds = seconds;
          resolve(true);
        };
        const listenerError = err => {
          console.log(err);
          if (audio) {
            audio.removeEventListener('error', listenerError);
            resolve(true);
          }
        };
        audio.addEventListener('loadedmetadata', listenerSave);
        audio.addEventListener('error', listenerError);
      }),
      new Promise(resolve => setTimeout(resolve, 300))
    ]);
    if (ok) {
      audio = null;
    }
    if (counter >= max) {
      break;
    }
  }
  return result;
}
