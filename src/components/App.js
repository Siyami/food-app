import React, { Component } from 'react';
import './../App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }

  }

  componentDidMount () {
    axios.get('/api/token')
      .then((res) => this.setState({ isLoggedIn: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>

          <Navbar className="Navbar" inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Food App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>

              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
              </Nav>

              {this.state.isLoggedIn ? (
                <Nav pullRight>
                  <NavItem eventKey={3} href="#" onClick={this.handleLogOutClick}>Sign Out</NavItem>
                </Nav>
              ) : (
                <Nav pullRight>
                  <NavItem eventKey={1} href="#" onClick={this.handleLogInClick}>Log In</NavItem>
                  <NavItem eventKey={2} href="#">Sign Up</NavItem>
                </Nav>
              )}

            </Navbar.Collapse>
          </Navbar>

          {/* this.props.children lets all children to be shown inside App component */}
          {this.props.children}

      </div>
    );
  }
}

export default App;
