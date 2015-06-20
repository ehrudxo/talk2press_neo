import React, { PropTypes } from 'react';
import StatusBar from './layout/StatusBar';
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
          <div className='App'>
            hoola~
            <hr />
            <RouteHandler {...this.props} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
