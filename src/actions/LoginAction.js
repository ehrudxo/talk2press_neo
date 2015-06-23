import { dispatchAsync } from '../Dispatchers/CommonDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as UserAPI from '../api/UserAPI';
import UserStore from '../stores/UserStore';

export function requestUser(fullName, fields) {
  if (UserStore.contains(fullName, fields)) {
    return;
  }

  dispatchAsync(UserAPI.getUser(fullName), {
    request: ActionTypes.REQUEST_USER,
    success: ActionTypes.REQUEST_USER_SUCCESS,
    failure: ActionTypes.REQUEST_USER_ERROR
  }, { fullName }); 
}
