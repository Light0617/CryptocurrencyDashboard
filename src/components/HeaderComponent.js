import {
  Navbar,
  Nav,
  NavItem,
  NavLink, Button,
  Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';
import React, { Component } from 'react';

class Header extends Component{ 
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalOpen: false,
      isSignupModalOpen: false,
      url: window.location.href.split("/").pop()
    };
    this.loginToggleModal = this.loginToggleModal.bind(this);
    this.signupToggleModal = this.signupToggleModal.bind(this);

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  loginToggleModal() {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen
    });
  }

  signupToggleModal() {
    this.setState({
      isSignupModalOpen: !this.state.isSignupModalOpen
    });
  }

  handleLogin(event) {
    this.loginToggleModal();
    this.props.loginUser({ username: this.username.value, password: this.password.value });
    event.preventDefault();
  }

  handleSignup(event) {
    this.signupToggleModal();
    this.props.signupUser({
      username: this.username.value,
      password: this.password.value
    });
    event.preventDefault();
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render(){
    console.log(this.state.url);
    return (
      <React.Fragment>
        <Navbar dark expand="md" className='headerBar'>
          <Nav pills>
            <NavItem>
              <NavLink href="/home" className = {(this.state.url === 'home' ? 'active' : 'inactive')}><span className="fa fa-home fa-lg">Home</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/coins" className = {(this.state.url === 'coins' ? 'active' : 'inactive')}><span className="fa fa-bitcoin fa-lg">Coins</span></NavLink>
            </NavItem>
            {this.props.auth.isAuthenticated 
              ? 
              <NavItem>
                <NavLink href="/dashboard" className = {(this.state.url === 'dashboard' ? 'active' : 'inactive')}><span className="fa fa-tachometer fa-lg">DashBoard</span></NavLink>
              </NavItem> 
              :
              <NavItem/>
            }
          </Nav>
          <Nav className='ml-auto'>
            {!this.props.auth.isAuthenticated
            ?
              <Nav>
                <NavItem>
                  <Button outline onClick={this.signupToggleModal}><span className="fa fa-user-plus fa-lg signupButton"></span>
                    <span className="signupButton"> Sign up </span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button outline onClick={this.loginToggleModal}><span className="fa fa-sign-in fa-lg loginButton"></span>
                    <span className="loginButton"> Login </span>
                  </Button>
                </NavItem>
              </Nav>
              :
              <NavItem>
                <h4>{this.props.auth.user.username}, &emsp;</h4>
                <Button outline onClick={this.handleLogout}>
                  <span className="fa fa-sign-out fa-lg">Logout</span> 
                </Button>
              </NavItem>
            }
          </Nav>
        </Navbar>

        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.loginToggleModal}>
          <ModalHeader className="login" toggle={this.loginToggleModal}>Login</ModalHeader>
          <ModalBody className="login">
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  innerRef={(input) => this.password = input} />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      
        <Modal isOpen={this.state.isSignupModalOpen} toggle={this.signupToggleModal}>
          <ModalHeader className="signup" toggle={this.signupToggleModal}>Sign up</ModalHeader>
          <ModalBody className="signup">
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  innerRef={(input) => this.password = input} />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Sign up</Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
};

export default Header;