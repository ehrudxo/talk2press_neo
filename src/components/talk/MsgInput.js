import React ,{Component} from 'react';
import  moment from 'moment';

var getMessageObj = function( msg, user ){
  return {  username:user.login,
            profileImg:user.avatarUrl,
            contents: msg,            
            currentTime:moment().format('A hh:mm')}
}

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

export default class MsgInput extends Component{
  constructor(props){
    super(props);
    this.socket = this.props.socketService;
    this.user = this.props.user;
    this.handleChange = this.handleChange.bind(this);
  }
  talk (e) {
    var textMessage = this.refs.userInput.getDOMNode().value;
    if(textMessage !== ''){
      this.socket.sendRequest({$type: 'commentsRequested',
                          data:getMessageObj(
                              textMessage, this.user)
                          }, messageHanlder.bind(this));
      this.refs.userInput.getDOMNode().value = '';
    }
  };
  handleChange (evt){
    if (evt.keyCode == 13 ) {
      this.talk();
      this.props.onChange();
    }
  };
  render (){
    return (
      <div className="inputTools">
        <div className="wrapInput">
          <div className="userInput">
            <input type="text"  ref="userInput" className ="msg-input" onKeyUp = {this.handleChange}/>
          </div>
        </div>
        <button className="btnPlus"> + </button>
        <button className="btnSend" onClick = {this.talk}>전송</button>
      </div>
    );
  };
};
