import React, {  PropTypes, findDOMNode ,Component } from 'react';
import DocumentTitle from 'react-document-title';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { RouteHandler } from 'react-router';

export default class LoginPage extends Component{
  static contextTypes = {
    router: PropTypes.func.isRequired
  };
  shouldComponentUpdate = shouldPureComponentUpdate;
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
  }

  render() {
    return (
      <DocumentTitle title={'Login'}>
        <div className='login-entry'>
          <div className="semi-title center">&nbsp;<i className="fa fa-github"></i> Github ID</div>
          <div>
            <input className="user-search"
                   placeholder="Please Type here"
                   ref='login'
                   onKeyUp={this.handleKeyUp}
                   onChange={this.handleOnChange}
                   />
            <button className="user-search-btn"
                    onClick={this.handleGoClick}>Go!</button>
          </div>
          <br/>
          <div className="little-title center"> Result </div>
          <hr/>
          <RouteHandler {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  }
  handleOnChange() {
    this.setState({
      login: this.getInputValue()
    });
  }
  handleGoClick() {
    this.context.router.transitionTo(`/login/${this.getInputValue()}`);
  }
  getInputValue() {
    return findDOMNode(this.refs.login).value;
  }
}
