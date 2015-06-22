import React, { Component}  from 'react';
import moment from 'moment';


export default class TextClock extends Component{
  constructor(props){
    super(props);
    setInterval(() =>{
      this.time = moment().format('A hh:mm');
      this.forceUpdate();
    }, 1000);
  };
  render() {
    return (<span  className="status-bar-gadget">{this.time}</span>);
  }
}
