import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import React, { Component } from 'react';

class Header extends Component{ 
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
    return (
      <React.Fragment>
        <Navbar dark expand="md" className='headerBar'>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav pills>
              <NavItem>
                <NavLink href="/home" active>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/coins">Coins</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/dashBoard">DashBoard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/home" active>Home</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
};

export default Header;