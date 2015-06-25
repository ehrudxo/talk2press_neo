import React, { PropTypes } from 'react';
import SocketService from '../util/SocketService';
import moment from 'moment';
import * as LoginUtil from '../util/LoginUtils';

const socketService = new SocketService();

var messages =[];
var messageHanlder = function(message,callback){
  if (message.$type === 'dataReceived') {
    if (!message.data) return;
    messages.push(message.data);
    this.props.onChange();
    this.refs.userInput.getDOMNode().value='';
  }

  if (message.$type === 'dataCompleted') {
    socket.requestComplete(message.$id);
    this.props.onChange();
    this.refs.userInput.getDOMNode().value='';
  }
  if (message.$type === 'error') {
    socket.requestComplete(message.$id);
    this.props.onChange();
    this.refs.userInput.getDOMNode().value='';
  }
}
var getMessageObj = function( msg, user ){
  return {  username:user.login,
            profileImg:user.avatarUrl,
            contents: msg,
            currentTime:moment().format('A hh:mm')}
}
export class FirstFMsg {
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };
  render(){
    return(
      React.createElement("div", null,
        React.createElement("div", {className: "profile"},
          React.createElement("img", {src: this.props.profileImg, className: "profileImg"})
        ),
        React.createElement("div", {className: "user"}, this.props.username),
        React.createElement("div", {className: "chat chat-left"},
          this.props.contents
        )
      )
    );
  };
};
export class Friend_Message {
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };
  render() {
    return(
      React.createElement("div", null,
        React.createElement("div", {className: "wrapchat"},
          this.props.message.profileImg?
            React.createElement(FirstFMsg, {profileImg: this.props.message.profileImg,
                username: this.props.message.username,
                contents: this.props.message.contents}):
                React.createElement("div", {className: "chat chat-left-2nd"},
                  this.props.message.contents
                ),
          this.props.message.currentTime?
            React.createElement("span", {className: this.props.message.profileImg?
              "currentTime-left":"currentTime-left-2nd"},
              this.props.message.currentTime):""
        )
      )
    );
  }
};

export class User_Message {
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };
  render () {
    return(
      React.createElement("div", null,
        React.createElement("div", {className: "wrapchat"},
          React.createElement("div", {className: "chat chat-right"},
            this.props.message.contents
          ),
          this.props.message.currentTime?React.createElement("span", {className: "currentTime-right"}, this.props.message.currentTime):""
        )
      )
    );
  };
};
export class Line_Break{
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };
  render (){
    return(React.createElement("div", {className: "line-break"}));
  };
};
export class InputMsg{
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };
  talk (e){
    var socket = this.props.socketService;
    var textMessage = this.refs.userInput.getDOMNode().value;
    if(textMessage !== ''){
      socket.sendRequest({$type: 'commentsRequested',
                          data:getMessageObj(
                              textMessage)
                          }, messageHanlder.bind(this));
      this.refs.userInput.getDOMNode().value = '';
    }
  };
  handleChange (evt){
    if (evt.keyCode == 13 ) {
      this.talk();
    }
  };
  render (){
    return (
      React.createElement("div", {className: "inputTools"},
      React.createElement("div", {className: "wrapInput"},
        React.createElement("div", {className: "userInput"},
          React.createElement("input", {type: "text", ref: "userInput", onKeyUp: this.handleChange})
        )
      ),
      React.createElement("button", {className: "btnPlus"}, " + "),
      React.createElement("button", {className: "btnSend", onClick: this.talk}, "전송")
      )
    );
  };
};
export class Content {
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };
  getInitialState() {
    socketService.addHandler(function(message){
      if (message.$type === 'broadcasted') {
        if (!message.data) return;
        messages.push(message.data);
        this.onChange();
      }
    }.bind(this));
    return {
        messages : this.props.messages
    };
  };
  onChange(){
    this.setState({messages:messages});
  };
  render() {
      var messagesCon=[];
      if(this.state.messages && this.state.messages.length > 0){
          this.state.messages.forEach(function( message ){
            if(message.username){
              messagesCon.push(React.createElement(Friend_Message, {message: message}));
            }else{
              messagesCon.push(React.createElement(User_Message, {message: message}));
            }
            messagesCon.push(React.createElement(Line_Break, null));
          }.bind(this));
      }
      return (
          React.createElement("div", null,
            React.createElement("div", {className: "messageBox"},
            messagesCon
            ),
           React.createElement(InputMsg, {onChange: this.onChange, socketService: this.props.socketService})
          )
      );
  }
}
export default class TalkPage {
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };
  render() {
    return (
      <Content messages={messages} socketService={socketService}/>
    );
  }
}
