import React, { Component } from 'react';
import './App.css';
import { Navbar, Button, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';

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

          <Grid>
            <Row>
              <Col xs={6} xsOffset={5}>
                <Button bsStyle="primary">Search Meal</Button>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={5}>
                <Button bsStyle="primary">Search Exercise</Button>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={5}>
                <Button bsStyle="primary">View Details</Button>
              </Col>
            </Row>
          </Grid>

      </div>
    );
  }
}

export default App;
