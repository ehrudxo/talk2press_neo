import { fetchUser, fetchUserArray } from '../util/APIUtils';

export function getUser(login, url = `users/${login}`) {
  return fetchUser(url);
}
