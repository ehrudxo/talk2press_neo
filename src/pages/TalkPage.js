import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import * as LoginUtil from '../util/LoginUtils';
import MsgInput from '../components/talk/MsgInput';
import Messages from '../components/talk/Messages';
import SocketService from '../util/SocketService';


export default class TalkPage extends Component{
  constructor(props){
    super(props);
    this.messages=[];

    this.socketService = new SocketService();
    this.socketService.addHandler(function(message){
      if (message.$type === 'broadcasted') {
        if (!message.data) return;
        this.messages.push(message.data);
        this.onChange();
      }
    }.bind(this));
    this.onChange = this.onChange.bind(this);
  }
  onChange(){
    this.setState({messages:this.messages});
  };
  render() {
    var user = LoginUtil.getUser();
    return (
      <DocumentTitle title={'Login'}>
        {user?
          <div className="message-box">
          <div className="margin-top-80"/>
          <Messages messages={this.messages}/>
          <MsgInput socketService={this.socketService} user={user} onChange={this.onChange}/>
          <div className="margin-top-80"/>
          </div>
          :this.moveSite()}
      </DocumentTitle>
    );
  }
  moveSite(){
    location.href="/";
  }
}
