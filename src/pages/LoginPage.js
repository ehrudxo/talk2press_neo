import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import * as LoginAction from '../actions/LoginAction';
import UserStore from '../stores/UserStore';
import UserCard from '../components/UserCard';
import connectToStores from '../util/connectToStores';

const DEFAULT_LOGIN = 'ehrudxo';
const GITHUB_REPO = 'https://github.com/gaearon/flux-react-router-example';

function parseFullName(params) {
  if (!params.login) {
    return DEFAULT_LOGIN;
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
export default class LoginPage {
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
    const login = parseLogin(params);
    return (
      <DocumentTitle title={'Login'}>
        <div className='login-entry'>
          <div className="semi-title center">&nbsp;<i className="fa fa-github"></i> Github ID</div>
          <div>
          &nbsp;
          <input className="user-search"
                 placeholder="Please Type here"
                 ref='login'
                 onKeyUp={this.handleKeyUp}
                 onChange={this.handleOnChange}
                 value={this.state.login}/>&nbsp;
          <button className="user-search-btn"
                  onClick={this.handleGoClick}>Go!</button>
          <div className="little-title center"> OR </div>
          </div>
          <hr/>
          <div>
          {user ?
            <UserCard user={user} /> :
            <h1>Loading...</h1>
          }
          </div>
        </div>
      </DocumentTitle>
    );
  }
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  }

  handleOnChange() {
    this.setState({
      loginOrRepo: this.getInputValue()
    });
  }

  handleGoClick() {
    this.context.router.transitionTo(`/${this.getInputValue()}`);
  }

  getInputValue() {
    return findDOMNode(this.refs.login).value;
  }
}
