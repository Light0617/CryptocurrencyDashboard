import React, { Component } from 'react';
import { Loading } from './Unit/LoadingComponent';
import { PaddingBlue } from './Style/coinStyle.js';
import { ChartSelect } from './Style/chartStyle.js';
import moment from 'moment';

import highchartsConfig from './Style/highchartsConfig';
import theme from './Style/highchartsTheme';
const ReactHighcharts = require('react-highcharts');
ReactHighcharts.Highcharts.setOptions(theme);

const cc = require('cryptocompare');
const TIME_UNITS = 10;

class HistoricalChart extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      timeInterval: 'months',
      historical: null
    };
  }

  componentDidMount() {
    this.fetchHistorical();
  }

  componentDidUpdate(prevProps) {
    console.log('key', prevProps.currentKey);
    console.log('next key', this.props.currentKey);
    if (this.props.currentKey !== prevProps.currentKey) {
      this.fetchHistorical();
    }
  }


  fetchHistorical = async() => {
    if (!this.props.coins || this.props.currentKey === -1) return;
    let results = await this.historical();
    console.log('res', results);
    let historical = [
      {
        name: this.props.currentKey,
        data: results.map((ticker, index) => [
          moment().subtract({ [this.state.timeInterval]: TIME_UNITS - index }).valueOf(),
          ticker.USD
        ])
      }
    ];
    this.setState({ historical });
  }

  historical = () => {
    console.log('fetch', this.props.currentKey);
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.props.currentKey,
          ['USD'],
          moment().subtract({ [this.state.timeInterval]: units }).toDate()
        )
      );
    }
    return Promise.all(promises);
  };

  render() {
    return (
      <PaddingBlue>
        <ChartSelect 
          defaultValue={'months'}
          onChange={e => {
            this.setState({ timeInterval: e.target.value, historical: null }, this.fetchHistorical);
          }}>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </ChartSelect>
        {this.state.historical ? (
          <ReactHighcharts config={highchartsConfig.call(this)} />
        ) : (
          <Loading/>
        )}
      </PaddingBlue>
    );
  }
}

export default HistoricalChart;