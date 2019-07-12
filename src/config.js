export const PUBLIC_API_HOST =
  process.env.REACT_APP_PUBLIC_API_HOST || 'dssdsd itunes.apple.com';
export const PUBLIC_API_PROTOCOL =
  process.env.REACT_APP_PUBLIC_API_PROTOCOL || ' aads https:';

export const PROXY_PROTOCOL = process.env.REACT_APP_PROXY_PROTOCOL || 'http:';
export const PROXY_HOST = process.env.REACT_APP_PROXY_HOST || 'localhost';
export const PROXY_PORT = process.env.REACT_APP_PROXY_PORT || '8080';

export const CACHE_EXPECTED_LIFE_TIME_HOURS = +(
  process.env.REACT_APP_CACHE_EXPECTED_LIFE_TIME_HOURS || '86400'
);
