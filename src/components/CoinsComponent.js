import React , {Component} from 'react';
import { CoinTile,CoinGrid } from './Style/coinStyle.js';
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
        <CoinTile 
          onClick={() => deleteFavorite(coinKey)}>
          <CoinHead coin={coins[coinKey]} />
        </CoinTile>
      );
    });
    return (
      <CoinGrid>{coinList}</CoinGrid>
    );
  }
}

function AllCoinList ({loading, favorites, coins, filteredCoinKeys, postFavorite}) {
  function checkInFavorite(coinKey, favoritekeys) {
    return _.includes(favoritekeys, coinKey);
  }

  if(loading || !favorites.favorites) {
    return ( <Loading/> );
  }
  else {
    const coinList = filteredCoinKeys.map((coinKey) => {
      return (
        <CoinTile 
          chosen={checkInFavorite(coinKey, favorites.favorites.coinKeys)}
          onClick={() => postFavorite(coinKey)}>
          <CoinHead coin={coins[coinKey]} />
        </CoinTile>
      );
    });
    return (
      <CoinGrid>{coinList}</CoinGrid>
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
    console.log('filteredCoinKeys', this.state.filteredCoinKeys);
  }

  render(){

    return (
      <div className="container2">
        {
          this.props.isAuthenticated ? 
          <div className="row"> 
            <FavoritesCoinList 
              favorites={this.props.favorites} 
              coins={this.props.coins} 
              deleteFavorite={this.props.deleteFavorite} />
          </div>
          :
          <div/>
        }
        <div className="row"> 
          <SearchContainer>
            <h2> Search all coins </h2>
            <SearchInput onKeyUp={this.filterCoins}/>
          </SearchContainer>
        </div>
        <div className="row">
          <AllCoinList 
            loading = {this.props.loading}
            favorites = {this.props.favorites}
            coins = {this.props.coins}
            postFavorite = {this.props.postFavorite}
            filteredCoinKeys = {this.state.filteredCoinKeys}
          />
        </div>
      </div>
    );
  }
}

export default Coins;