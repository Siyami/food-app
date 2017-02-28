import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { } from 'react-bootstrap';
// import axios from 'axios';


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
          <h3> Your weight maintenance calorie goal is 1700</h3>
          <Row>
            <Col xs={6} md={4}>
              <h4>Feb 26, 2017</h4>
              <div>
              <p>Calories consumed: 2000</p>
              <p>Calories burned: 400</p>
              <p>Result: -100</p>
              <div>
                <h5>Nutrient Totals</h5>
                <p>Carbohydrate: 27g</p>
                <p>Fat: 18g</p>
                <p>Protein: 16g</p>
                <p>Fiber: 5g</p>
              </div>
            </div>
            </Col>
            <Col xs={6} md={4}>
              <h4>Feb 27, 2017</h4>
              <div>
              <p>Calories consumed: 3000</p>
              <p>Calories burned: 100</p>
              <p>Result: +1200</p>
              <div>
                <h5>Nutrient Totals</h5>
                <p>Carbohydrate: 27g</p>
                <p>Fat: 18g</p>
                <p>Protein: 16g</p>
                <p>Fiber: 5g</p>
              </div>
            </div>
            </Col>
            <Col xs={6} md={4}>
              <h4>Feb 28, 2017</h4>
              <div>
              <p>Calories consumed: 1900</p>
              <p>Calories burned: 300</p>
              <p>Result: -200</p>
              <div>
                <h5>Nutrient Totals</h5>
                <p>Carbohydrate: 27g</p>
                <p>Fat: 18g</p>
                <p>Protein: 16g</p>
                <p>Fiber: 5g</p>
              </div>
            </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Summary;
