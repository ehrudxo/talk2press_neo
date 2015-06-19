/** @jsx React.DOM */
import SocketService from '../util/SocketService';
const socketService = new SocketService();

var messages =[];
var messageHanlder = function(message){
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


/*
messages.push({username:"팀레고", profileImg:"./img/profile_kakao_04.png",contents:"어디야 1234567890123",currentTime:"오후3:08"});
messages.push({contents:"신촌", currentTime:"오후3:09"});
messages.push({username:"팀레고", profileImg:"./img/profile_kakao_04.png",contents:"뭐해 나 배고픈데..."});
messages.push({username:"팀레고", contents:"뭐해 나 배고픈데..."});
messages.push({username:"팀레고", contents:"뭐해 나 배고픈데...",currentTime:"오후3:09"});
messages.push({contents:"나도 배고파. 같이 밥 먹을까? 넌 어딘데?",currentTime:"오후3:09"});
messages.push({username:"팀레고", profileImg:"./img/profile_kakao_04.png",contents:"여기는 홍대 입구 역인데 빨리가면 30분 안에 갈수 있지 않을까? 배고플땐.여기는 홍대 입구 역인데 빨리가면 30분 안에 갈수 있지 않을까? 배고플땐.여기는 홍대 입구 역인데 빨리가면 30분 안에 갈수 있지 않을까? 배고플땐."});
messages.push({username:"팀레고", contents:"여기는 홍대 입구 역인데 빨리가면 30분 안에 갈수 있지 않을까? 배고플땐.여기는 홍대 입구 역인데 빨리가면 30분 안에 갈수 있지 않을까? 배고플땐.여기는 홍대 입구 역인데 빨리가면 30분 안에 갈수 있지 않을까? 배고플땐.",currentTime:"오후3:10"});
*/
var getMessageObj = function(msg){
  return {  username:"팀레고",
            profileImg:"./img/profile_kakao_04.png",
            contents: msg,
            currentTime:"오후3:08"}
}
var FirstFMsg = React.createClass({displayName: "FirstFMsg",
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function(){
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
  }
});
var Friend_Message = React.createClass({displayName: "Friend_Message",
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
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
});

var User_Message = React.createClass({displayName: "User_Message",
  contextTypes: {
    router: React.PropTypes.func
  },
  render : function() {
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
  }
});
var Line_Break = React.createClass({displayName: "Line_Break",

  contextTypes: {
    router: React.PropTypes.func
  },
  render : function(){
    return(React.createElement("div", {className: "line-break"}));
  }
});
var InputMsg = React.createClass({displayName: "InputMsg",
  contextTypes: {
    router: React.PropTypes.func
  },
  talk : function(e){
    var socket = this.props.socketService;
    var textMessage = this.refs.userInput.getDOMNode().value;
    if(textMessage !== ''){
      socket.sendRequest({$type: 'commentsRequested',
                          data:getMessageObj(
                              textMessage)
                          }, messageHanlder.bind(this));
      this.refs.userInput.getDOMNode().value = '';
    }
  },
  handleChange : function(evt){
    if (evt.keyCode == 13 ) {
      this.talk();
    }
  },
  render : function(){
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
  }
});
var Content = React.createClass({displayName: "Content",
    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState: function() {
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
    },
    onChange : function(){
      this.setState({messages:messages});
    },
    render: function() {
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
});
