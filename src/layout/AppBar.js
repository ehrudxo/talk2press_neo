import React, { PropTypes } from 'react';

export default class StatusBar{
  constructor(props){
  }
  static contextTypes = {
    router: PropTypes.func.isRequired
  };
  render() {
    var title = this.props.title;
    if(!title)title="Talk2Press";
    return (
        <div className="app-bar">
          <div className="app-bar-title">
            {title}
          </div>
        </div>
    );
  }
}
