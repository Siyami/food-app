import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <h3> Your weight maintenance calorie goal is 1700</h3>
            <Col>
              <div>
              <p>Calories consumed: 1900</p>
              <p>Calories burned: 300</p>
              <p>Result: -200</p>
            </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Summary;
