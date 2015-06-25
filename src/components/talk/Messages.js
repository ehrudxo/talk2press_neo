import React,{Component, PropTypes, findDOMNode} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Messages extends Component{
  render (){
    var messagesCon=[];
    if(this.props.messages && this.props.messages.length > 0){
        this.props.messages.forEach(function( message ){
          if(message.username){
            messagesCon.push(<FriendMessage message={message}/>);
          }else{
            messagesCon.push(<UserMessage message={message}/>);
          }
          messagesCon.push(<LineBreak/>);
        }.bind(this));
    }
    return(
      <div>
      {messagesCon}
      </div>
    );
  };
};
export class MessageComponent extends Component{
  constructor(){
    super();
  }
  shouldComponentUpdate = shouldPureComponentUpdate;
  componentWillMount() {
    this.shouldScrollBottom = "500px";
  }
}
export class FirstFMsg extends MessageComponent{
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
export class FriendMessage extends MessageComponent{
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

export class UserMessage extends MessageComponent{
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
export class LineBreak extends MessageComponent{
  render (){
    return(<div className="line-break"/>);
  };
};
