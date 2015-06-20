import React, { PropTypes } from 'react';
import TextClock from '../components/TextClock';
export default class StatusBar {
  static propTypes = {
  };
  static contextTypes = {
    router: PropTypes.func.isRequired
  };
  render() {
    return (
        <div className="status-bar">
          <TextClock/>
        </div>
    );
  }
}
