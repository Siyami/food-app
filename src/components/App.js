import React, { Component } from 'react';
import './../App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>

          <Navbar className="Navbar" inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Food App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Log In</NavItem>
                <NavItem eventKey={2} href="#">Sign Up</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* this.props.children lets all children to be shown inside App component */}
          {this.props.children}


      </div>
    );
  }
}

export default App;
