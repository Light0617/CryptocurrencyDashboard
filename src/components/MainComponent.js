import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Coins from './CoinsComponent';
import Dashboard from './DashboardComponent';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Main extends Component { 
  constructor(props) {
    super(props);
  }

  render() {

    const HomePage = () => {
      return (
        <Home
        />
      );
    }

    const CoinsPage = () => {
      return (
        <Coins
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
      <div class='bodyContent'>
        <Header 
        />
        <TransitionGroup>
          <CSSTransition>
            <Switch>
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

export default Main;