import React, { PropTypes } from 'react';
import TextClock from '../components/TextClock';
import Signal from '../components/Signal';
import Telecompany from '../components/Telecompany';
import Wifi from '../components/Wifi';

export default class StatusBar {
  render() {
    return (
        <div className="status-bar">
          <Telecompany/>
          <Wifi/>
          <TextClock/>
          <Signal/>
        </div>
    );
  }
}
