import React, { PropTypes } from 'react';
import StatusBar from './layout/StatusBar';
import AppBar from './layout/AppBar'
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';

export default class App {
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };
  render() {
    return (
      <DocumentTitle title='Talk2Press'>
        <div>
          <StatusBar/>
          <AppBar/>
          <div className='app-entry'>
            <RouteHandler {...this.props} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
