import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>

          <Grid>
            <Row>
              <Col xs={6} xsOffset={5}>
                <Link to="/searchmeal" >
                  <Button bsStyle="primary">Search Meal</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={5}>
                <Link to="/searchexercise" >
                <Button bsStyle="primary">Search Exercise</Button>
              </Link>
              </Col>
            </Row>
            <Row>

              <Col xs={6} xsOffset={5}>
                <Link to="/summary" >
                <Button bsStyle="primary">View Details</Button>
              </Link>
              </Col>
            </Row>
          </Grid>

      </div>
    );
  }
}

export default Home;
