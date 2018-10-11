import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Coins from './CoinsComponent';
import Dashboard from './DashboardComponent';

import { loginUser, logoutUser, signupUser } from '../redux/ActionCreators';
import { fetchFavorites, postFavorite, deleteFavorite } from '../redux/Actions/Favorites.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const cc = require('cryptocompare');

const mapStateToProps = state => {
  return {
    auth: state.auth,
    favorites: state.favorites,
  }
}

const mapDispatchToProps = dispatch => ({
  signupUser: (creds) => dispatch(signupUser(creds)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),

  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (coinKey) => dispatch(postFavorite(coinKey)),
  deleteFavorite: (coinKey) => dispatch(deleteFavorite(coinKey))
});

class Main extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      coinList: [],
      prices: null
    };
  }

  componentDidMount() {
    this.fetchCoins();
    this.props.fetchFavorites().then((favorites) => {
      this.fetchPrices(favorites.payload.coinKeys);
    })
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList : coinList });
  }

  fetchPrices = async (favoriteCoinKeys) => {
    if (!this.props.auth.isAuthenticated) return;
    let prices = await this.prices(favoriteCoinKeys);
    this.setState({ prices : prices });
  }

  prices = async (favoriteCoinKeys) => {
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
    const CoinsPage = () => {
      return (
        <Coins
          loading = {this.state.coinList.length === 0 ? true : false }
          coinKeys = {Object.keys(this.state.coinList).slice(0, 100)}
          coins = {this.state.coinList}

          isAuthenticated = {this.props.auth.isAuthenticated}
          postFavorite={this.props.postFavorite}
          favorites={this.props.auth.isAuthenticated ? this.props.favorites : []}
          deleteFavorite={this.props.deleteFavorite}
        />
      );
    }

    const DashboardPage = () => {
      return (
        <Dashboard
          loading = {this.state.coinList.length === 0  || !this.state.prices? true : false }
          coins = {this.state.coinList}

          favorites = {this.props.auth.isAuthenticated ? this.props.favorites : []}
          prices = {this.state.prices}
        />
      );
    }

    return (
      <div className='bodyContent'>
        <Header 
          auth = {this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
          signupUser={this.props.signupUser}
        />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={250}>
            <Switch location={this.props.location}>
              <Route path='/home' component={Home} />
              <Route path='/coins' component={CoinsPage} />
              <Route path='/dashboard' component={DashboardPage} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));