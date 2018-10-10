import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Coins from './CoinsComponent';
import Dashboard from './DashboardComponent';

import { loginUser, logoutUser, signupUser } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  signupUser: (creds) => dispatch(signupUser(creds)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
});

class Main extends Component { 
  constructor(props) {
    super(props);
  }
  componentDidMount() {
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