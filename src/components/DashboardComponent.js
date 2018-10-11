import React, { Component } from 'react';
import { CoinTile } from './Style/coinStyle.js';
import { Card } from 'reactstrap';
import { Loading } from './Unit/LoadingComponent';
import CoinPriceHead from './Unit/CoinPriceHeadComponent';
import CoinBigPic from './Unit/CoinBigPicComponent';
import HistoricalChart from './HistoricalChartComponent';

function FavoritesCoinList({favorites, coins, prices, updateKey}) {
  if(!favorites || favorites.isLoading || !coins || coins.length === 0 || favorites.favorites == null || !prices) {
    return ( <Loading/> );
  } else{
    const keys = favorites.favorites.coinKeys;
    const coinList = keys.map((coinKey) => {
      return (
        <div className="col-12 col-md-2" key={coinKey} margin-bottom='20px'
         onClick={() => updateKey(coinKey)}
         >
          <Card>
            <CoinTile>
              <CoinPriceHead 
                coin={coins[coinKey]} 
                change={prices[coinKey]['CHANGE24HOUR']}
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

class DashBoard extends Component{ 
  constructor(props) {
    super(props);
    this.state = {
      currentKey: 
        !this.props.loading && this.props.favorites.favorites && this.props.favorites.favorites.coinKeys.length > 0 ? 
        this.props.favorites.favorites.coinKeys[0] : -1
    };
    this.updateKey = this.updateKey.bind(this)
  }
  updateKey(coinKey) {
    this.setState({
      currentKey: coinKey
    });
  }

  render() {
    return (
      <div className="container2">
        <div className="row"> <h1>Dashboard</h1></div>
        <div className="row"> 
          <FavoritesCoinList 
            favorites={this.props.favorites} 
            coins={this.props.coins}
            prices={this.props.prices}
            updateKey = {this.updateKey}
            />
        </div>
        <div className="row"><hr/></div>
        <div className="row">
          <div className="col-sm-4">
            {this.state.currentKey !== -1 ? 
              <CoinBigPic currentCoin = {this.props.coins[this.state.currentKey]}/> 
              : 
              <Loading/>
            }
          </div>
          <div className="col-sm-8">
            <HistoricalChart
              coins = {this.props.coins}
              currentKey = {this.state.currentKey}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;