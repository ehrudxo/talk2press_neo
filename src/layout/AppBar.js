import React, { PropTypes } from 'react';
import * as LoginUtils from '../util/LoginUtils';

export default class StatusBar{
  constructor(props){
  }
  static contextTypes = {
    router: PropTypes.func.isRequired
  };
  render() {
    var title = this.props.title;
    var isLogin = LoginUtils.isLogin();
    if(!title)title="Talk2Press";
    return (
        <div className="app-bar">
          <div className="app-bar-title">
            {title}
            <span className="fright">
              {isLogin?<button>logout</button>:<span/>}
            </span>
          </div>
        </div>
    );
  }
}
