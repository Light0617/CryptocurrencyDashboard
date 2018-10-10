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
      coinList: []
    };
  }

  componentDidMount() {
    this.fetchCoins();
    this.props.fetchFavorites();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList : coinList });
  }

  render() {
    const HomePage = () => {
      return (
        <Home/>
      );
    }

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
              <Route path='/home' component={CoinsPage} />
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