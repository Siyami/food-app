import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router'
// import './../Home.css';


class Home extends Component {
  render() {
    return (
      <div>
          <Grid>
            <Row>
              <Col xs={4} xsOffset={4}>
                <Link to="/searchmeal" >
                  <Button style={{ width: "100%" }} bsSize="large" >Add Meals</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={4} xsOffset={4}>
                <Link to="/searchexercise" >
                <Button style={{ width: "100%" }} bsSize="large">Add Exercise</Button>
              </Link>
              </Col>
            </Row>
            <Row>

              <Col xs={4} xsOffset={4}>
                <Link to="/summary" >
                <Button style={{ width: "100%" }} bsSize="large">Daily Summaries</Button>
              </Link>
              </Col>
            </Row>
          </Grid>

      </div>
    );
  }
}

export default Home;
