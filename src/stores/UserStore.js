import { register } from '../Dispatchers/CommonDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../util/StoreUtils';
import selectn from 'selectn';

const _users = {};

const UserStore = createStore({
  contains(login, fields) {
    return isInBag(_users, login, fields);
  },

  get(login) {
    return _users[login];
  }
});

UserStore.dispatchToken = register(action => {
  const responseUsers = selectn('response.entities.users', action);
  if (responseUsers) {
    mergeIntoBag(_users, responseUsers);
    UserStore.emitChange();
  }
});

export default UserStore;
