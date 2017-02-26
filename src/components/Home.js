import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>


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

export default Home;
