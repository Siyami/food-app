import React, { Component } from 'react';
import './../App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }

    this.setStateFromLoginComponent = this.setStateFromLoginComponent.bind(this);
    this.logOut = this.logOut.bind(this);

  }

  componentWillMount () {
    axios.get('/api/token')
      .then((res) => {
         this.setState({ isLoggedIn: res.data })
       })
      .catch(err => {
        console.log(err)
      });
  }

  logOut() {
    axios.delete('/api/token')
      .then((res) => {
        this.setState({
          isLoggedIn: false
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  setStateFromLoginComponent() {
    this.setState({
      isLoggedIn: true
    })
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
                <NavItem eventKey={3} onClick={this.logOut}>Sign Out</NavItem>
              </Nav>
            ) : (
              <Nav pullRight>

                <NavItem eventKey={1} onClick={() => browserHistory.push('/login')}>Log In</NavItem>
                <NavItem eventKey={2} onClick={() => browserHistory.push('/signup')}>Sign Up</NavItem>
              </Nav>
            )}

          </Navbar.Collapse>
        </Navbar>

        {/* this.props.children lets all children to be shown inside App component */}
        {/* {this.props.children} */}

        {React.cloneElement(
          this.props.children,
          {
          setStateFromLoginComponent: this.setStateFromLoginComponent
          }
        )}

      </div>
    );
  }
}

export default App;
