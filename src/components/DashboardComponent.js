import React, { Component } from 'react';
import { CoinTile } from './Style/coinStyle.js';
import { Card } from 'reactstrap';
import { Loading } from './Unit/LoadingComponent';
import CoinPriceHead from './Unit/CoinPriceHeadComponent';
import CoinBigPic from './Unit/CoinBigPicComponent';
import HistoricalChart from './HistoricalChartComponent';

function FavoritesCoinList({favorites, coins, prices, updateKey, volatility}) {
  if(!favorites.coinKeys || coins.length === 0 || prices.length === 0 || volatility.length === 0) {
    return ( <Loading/> );
  } else{
    console.log('prices', prices);
    const keys = favorites.coinKeys;
    const coinList = keys.map((coinKey) => {
      return (
        <div className="col-12 col-md-2" key={coinKey} margin-bottom='20px'
         onClick={() => updateKey(coinKey)}
         >
          <Card>
            <CoinTile>
              <CoinPriceHead 
                coin={coins[coinKey]} 
                change={
                  volatility.hasOwnProperty(coinKey) ? volatility[coinKey] : prices[coinKey]['CHANGE24HOUR']
                }
                price={prices[coinKey]['PRICE']} />
            </CoinTile>
          </Card>
        </div>
      );
    });
    return (
      <div className="row" margin='15px'>{coinList}</div>
    );
  }
}

const cc = require('cryptocompare');
class DashBoard extends Component{ 
  constructor(props) {
    super(props);
    this.state = {
      prices : [],
      currentKey: 
        !this.props.loading && this.props.favorites && this.props.favorites.coinKeys.length > 0 ? 
        this.props.favorites.coinKeys[0] : -1
    };
    this.updateKey = this.updateKey.bind(this);
    this.fetchPrices = this.fetchPrices.bind(this);
    this.getPrices = this.getPrices.bind(this);
  }
  updateKey(coinKey) {
    this.setState({
      currentKey: coinKey
    });
  }

  componentDidMount() {
    if (this.props.favorites)
      this.fetchPrices(this.props.favorites.coinKeys)
  }

  fetchPrices = async (favoriteCoinKeys) => {
    let prices = await this.getPrices(favoriteCoinKeys);
    this.setState({ prices : prices });
  }
  getPrices = async (favoriteCoinKeys) => {
    let returnData = {};
    for (let i = 0; i < favoriteCoinKeys.length; i++) {
      try {
        let priceData = await cc.priceFull(favoriteCoinKeys[i], 'USD');
        returnData[favoriteCoinKeys[i]] = priceData[favoriteCoinKeys[i]]['USD'];
      } catch (e) {
        console.warn('Fetch price error: ', e);
      }
    }
    return returnData;
  };


  render() {
    return (
      <div className="container2">
        <div className="row"> <h1>Dashboard</h1></div>
        {
          !this.props.loading ? 
            <FavoritesCoinList 
              favorites={this.props.favorites} 
              coins={this.props.coins}
              prices={this.state.prices}
              updateKey = {this.updateKey}
              volatility = {this.props.volatility.reduce(function(map, obj) {
                map[obj.id] = obj.volatility;
                return map;
                }, {})}
            />
          :
          <Loading/>
        }
        <div className="row"><hr/></div>
          {
            this.state.currentKey !== -1 && !this.props.loading ? 
              <div className="row">
                <div className="col-sm-4">
                  <CoinBigPic currentCoin = {this.props.coins[this.state.currentKey]}/> 
                </div>
                <div className="col-sm-8">
                  <HistoricalChart
                    coins = {this.props.coins}
                    currentKey = {this.state.currentKey}
                  />
                </div>
              </div>
            :
            <Loading/>
          }
      </div>
    );
  }
}

export default DashBoard;