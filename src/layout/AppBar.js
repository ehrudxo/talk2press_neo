import React from 'react';
import * as LoginUtil from '../util/LoginUtils';

export default class AppBar{
  render() {
    var title = this.props.title;
    var isLogin = LoginUtil.isLogin();
    if(!title)title="Talk2Press";
    return (
        <div className="app-bar">
          <div className="app-bar-title">
            {title}
            <span className="fright">
              {isLogin?<button onClick={this.logout}>logout</button>:<span/>}
            </span>
          </div>
        </div>
    );
  }
  logout(){
    LoginUtil.logout();
    location.href='/#login';
  }
}
