import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Coins from './CoinsComponent';
import Dashboard from './DashboardComponent';

import { loginUser, logoutUser, signupUser, checkLogin } from '../redux/ActionCreators';
import { fetchFavorites, postFavorite, deleteFavorite } from '../redux/Actions/Favorites.js';
import { fetchCoins } from '../redux/Actions/Coins.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    auth: state.auth,
    favorites: state.favorites,
    coins: state.coins
  }
}

const mapDispatchToProps = dispatch => ({
  signupUser: (creds) => dispatch(signupUser(creds)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  checkLogin: () => dispatch(checkLogin()),

  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (coinKey) => dispatch(postFavorite(coinKey)),
  deleteFavorite: (coinKey) => dispatch(deleteFavorite(coinKey)),
  fetchCoins: () => dispatch(fetchCoins())
});

class Main extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      coinList: []
    };
  }

  componentDidMount() {
    this.props.fetchCoins();
    console.log('check', this.props.checkLogin());
    this.props.auth.isAuthenticated = this.props.checkLogin();
    this.props.fetchFavorites();
  }

  render() {
    const CoinsPage = () => {
      return (
        <Coins
          loading = {this.props.coins.isLoading}
          coinKeys = {this.props.coins.coins ? Object.keys(this.props.coins.coins).slice(0, 100) : []}
          coins = {this.props.coins.coins}

          isAuthenticated = {this.props.auth.isAuthenticated}
          favorites={this.props.auth.isAuthenticated ? this.props.favorites : []}
          postFavorite={this.props.postFavorite}
          deleteFavorite={this.props.deleteFavorite}
        />
      );
    }

    const DashboardPage = () => {

      return (
        <Dashboard
          loading = {this.props.favorites.isLoading || this.props.coins.isLoading }
          coins = {this.props.coins.coins}

          favorites = {this.props.auth.isAuthenticated ? this.props.favorites.favorites : []}
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
              <Route path='/dashboard' component={this.props.auth.isAuthenticated ? DashboardPage : Home} />
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