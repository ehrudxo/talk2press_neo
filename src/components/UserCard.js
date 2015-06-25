import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as LoginUtil from '../util/LoginUtils';

export default class UserCard extends Component{
  static propTypes = {
    user: PropTypes.object.isRequired
  };
  shouldComponentUpdate = shouldPureComponentUpdate;
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }
  render() {
    this.user = this.props.user;

    return (
      <div className="user-card" onClick={this.login}>
          <span>
          <img className="circle-profile profile-gap" src={this.user.avatarUrl} width='72' height='72' />
          </span>
          <span className="user-name">
            {this.user.login}
          </span>
      </div>
    );
  }
  login() {
    LoginUtil.login(this.user, ()=>{
      location.href='#/talk';
    });
  }
}
