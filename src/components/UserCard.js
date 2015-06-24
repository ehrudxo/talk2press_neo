import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class User {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { user } = this.props;

    return (
      <div className="user-card">
        <Link to='login' params={{ login: user.login }}>
          <span>
          <img className="circleProfile profileGap" src={user.avatarUrl} width='72' height='72' />
          </span>
          <span className="user-name">
            {user.login}
          </span>
        </Link>
      </div>
    );
  }
}
