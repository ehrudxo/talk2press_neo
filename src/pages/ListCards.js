import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import * as LoginAction from '../actions/LoginAction';
import UserStore from '../stores/UserStore';
import UserCard from '../components/UserCard';
import connectToStores from '../util/connectToStores';
import { Link } from 'react-router';

function parseFullName(params) {
  if (!params.login) {
    return undefined;
  }
  return params.login + (params.name ? '/' + params.name : '');
}

function parseLogin(params) {
  return params.login;
}
/**
 * Requests data from server for current props.
 */
function requestData(props) {
  const { params } = props;
  const userLogin = parseLogin(params);

  LoginAction.requestUser(userLogin, ['name', 'avatarUrl']);
}

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  const login = parseLogin(props.params);
  const user = UserStore.get(login);
  return {user};
}

@connectToStores([UserStore], getState)
export default class ListCards {
  static propTypes = {
    // Injected by React Router:
    params: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired,

    // Injected by @connectToStores:
    user: PropTypes.object
  };

  constructor(props) {
    this.state = {
      login: parseFullName(props.params)
    };
  }

  componentWillMount() {
    requestData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (parseLogin(nextProps.params) !== parseLogin(this.props.params)) {
      requestData(nextProps);
    }
  }
  render() {
    const { user, params } = this.props;
    console.log(user,params);
    return (
      <DocumentTitle title={`${user?user.login:params.login} Log-in`}>
        <div className='user-lists'>
          {user ?
            <UserCard user={user} /> :<div>
            <h4>There is no user who named "{params.login}"</h4>
            <div className="right">
              <Link to='login'>
                <i className="fa fa-hand-o-left"></i> 돌아가기
              </Link>
            </div>
            </div>
          }
        </div>
      </DocumentTitle>
    );
  }

}
