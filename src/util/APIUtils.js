import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'core-js/es6/promise';
import 'whatwg-fetch';

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by Stores, because each Store can just grab entities of its kind.
// Read more about Normalizr: https://github.com/gaearon/normalizr

const userSchema = new Schema('users', { idAttribute: 'login' });

const API_ROOT = 'https://api.github.com/';

/**
 * Fetches an API response and normalizes the result JSON according to schema.
 */
function fetchAndNormalize(url, schema) {
  if (url.indexOf(API_ROOT) === -1) {
    url = API_ROOT + url;
  }

  return fetch(url).then(response =>
    response.json().then(json => {
      const camelizedJson = camelizeKeys(json);
      return {
        ...normalize(camelizedJson, schema)
      };
    })
  );
}

export function fetchUser(url) {
  return fetchAndNormalize(url, userSchema);
}

export function fetchUserArray(url) {
  return fetchAndNormalize(url, arrayOf(userSchema));
}
