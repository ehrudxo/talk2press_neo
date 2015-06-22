import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

export default class LoginPage {
  render() {
    return (
      <DocumentTitle title={'Login'}>
        <div className='login-entry'>
        id : <input type='text'></input>
        </div>
      </DocumentTitle>
    );
  }
}
