import throttle from 'lodash.throttle';

const key = 'state';

export const saveState = state => {
  try {
    const serializedState = state.entities;
    localStorage.setItem(key, JSON.stringify({ entities: serializedState }));
  } catch (e) {
    // ignore write errors
    console.error(e);
  }
};

export const getState = () => {
  return JSON.parse(localStorage.getItem(key)) || {};
};

export const saveStateWithThrottle = throttle(saveState, 1000);
