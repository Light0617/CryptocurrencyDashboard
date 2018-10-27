import React , {Component} from 'react';
import { CoinTile } from './Style/coinStyle.js';
import { Card } from 'reactstrap';
import { SearchContainer, SearchInput } from './Style/search.js';
import _ from 'lodash';
import { Loading } from './Unit/LoadingComponent';
import CoinHead from './Unit/CoinHeadComponent';
import fuzzy from 'fuzzy';

function FavoritesCoinList({favorites, coins, deleteFavorite}) {
  if(!favorites || favorites.isLoading || !coins || coins.length === 0 || favorites.favorites == null) {
    return ( <Loading/> );
  } else{
    const keys = favorites.favorites.coinKeys;
    const coinList = keys.map((coinKey) => {
      return (
        <div className="col-12 col-md-2" key={coinKey} margin-bottom='20px'>
          <Card>
            <CoinTile onClick={() => deleteFavorite(coinKey)}>
              <CoinHead coin={coins[coinKey]} />
            </CoinTile>
          </Card>
        </div>
      );
    });
    return (
      <div className="row">{coinList}</div>
    );
  }
}

function AllCoinList ({loading, favorites, coins, filteredCoinKeys, postFavorite, isAuthenticated}) {
  function checkInFavorite(coinKey, favoritekeys) {
    return _.includes(favoritekeys, coinKey);
  }

  if(loading || (isAuthenticated && !favorites.favorites)) {
    return ( <Loading/> );
  } else if(!isAuthenticated){
    const coinList = filteredCoinKeys.map((coinKey) => {
      return (
        <div className="col-12 col-md-2" key={coinKey} margin-bottom='20px'>
          <Card>
            <CoinTile>
              <CoinHead coin={coins[coinKey]} /> 
            </CoinTile>
          </Card>
        </div>
      );
    });
    return (
      <div className="row">{coinList}</div>
    );
  }
  else {
    const coinList = filteredCoinKeys.map((coinKey) => {
      return (
        <div className="col-12 col-md-2" key={coinKey} margin-bottom='20px'>
          <Card>
            <CoinTile key={coinKey}
              chosen={checkInFavorite(coinKey, favorites.favorites.coinKeys)}
              onClick={() => postFavorite(coinKey)}>
              <CoinHead coin={coins[coinKey]} />
            </CoinTile>
          </Card>
        </div>
      );
    });
    return (
      <div className="row">{coinList}</div>
    );
  }
}


class Coins extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      filteredCoinKeys: this.props.coinKeys
    };
  }

  handleFilter = _.debounce(inputValue => {
    let coinSymbols = Object.keys(this.props.coins);
    let coinNames = coinSymbols.map(sym => this.props.coins[sym].CoinName);
    let allStringToSearch = coinSymbols.concat(coinNames);
    let fuzzyResults = fuzzy.filter(inputValue, allStringToSearch, {}).map(result => result.string);

    let filteredCoinKeys = _.pickBy(this.props.coins, (result, symKey) => {
      let coinName = result.CoinName;
      return (
        _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
      );
    });
    this.setState({ filteredCoinKeys : Object.keys(filteredCoinKeys) });
  }, 500);

  filterCoins = e => {
    let inputValue = _.get(e, 'target.value');
    if(!inputValue) {
      this.setState({
        filteredCoinKeys: this.props.coinKeys
      });
      return;
    }
    this.handleFilter(inputValue);
  }

  render(){
    return (
      <div className="container2">
        {
          this.props.isAuthenticated ? 
          <FavoritesCoinList 
            favorites={this.props.favorites} 
            coins={this.props.coins} 
            deleteFavorite={this.props.deleteFavorite} />
          :
          <div/>
        }
        <div className="row"> 
          <SearchContainer>
            <h2> Search all coins </h2>
            <SearchInput onKeyUp={this.filterCoins}/>
          </SearchContainer>
        </div>
        <div className="row"><hr/></div>
        <div className="row">
          <AllCoinList 
            loading = {this.props.loading}
            favorites = {this.props.favorites}
            coins = {this.props.coins}
            isAuthenticated = {this.props.isAuthenticated}
            postFavorite = {this.props.postFavorite}
            filteredCoinKeys = {this.state.filteredCoinKeys}
          />
        </div>
      </div>
    );
  }
}

export default Coins;