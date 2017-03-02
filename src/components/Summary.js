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
          <Row>
            <Col xs={12} md={8} mdOffset={3}>
          <div style={{backgroundColor: "white", padding:"2%", width: "70%", borderRadius: "15px"}}>
          <h3> Your weight maintenance calorie goal is 1700</h3>
        </div>
      </Col>
    </Row>
          <Row>
            <Col xs={6} md={4} >
              <div style={{backgroundColor: "white", padding:"5%", width: "70%", borderRadius: "15px", marginTop: "10%"}}>
                <h4>Feb 26, 2017</h4>
                <div>
                  <h5 style={{fontWeight: "bold"}}>Nutrient Totals</h5>
                  <p>Carbohydrate: 27g <br/>
                  Fat: 18g <br/>
                  Protein: 16g<br/>
                  Fiber: 5g</p>
                </div>
                <h5 style={{fontWeight: "bold"}}>Energy Balance</h5>
              <p>Calories consumed: 2000<br/>
                 Calories burned: 400<br/>
                 Result: <span style={{color: "green", fontSize: "30px"}}> -100</span></p>
            </div>
            </Col>
            <Col xs={6} md={4} >
              <div style={{backgroundColor: "white", padding:"5%", width: "70%", borderRadius: "15px", marginTop: "10%"}}>
                <h4>Feb 27, 2017</h4>
                <div>
                  <h5 style={{fontWeight: "bold"}}>Nutrient Totals</h5>
                  <p>Carbohydrate: 27g <br/>
                  Fat: 18g <br/>
                  Protein: 16g<br/>
                  Fiber: 5g</p>
                </div>
                <h5 style={{fontWeight: "bold"}}>Energy Balance</h5>
              <p>Calories consumed: 3000<br/>
                 Calories burned: 400<br/>
                 Result: <span style={{color: "red", fontSize: "30px"}}>+500</span></p>
            </div>
            </Col>
            <Col xs={6} md={4} >
              <div style={{backgroundColor: "white", padding:"5%", width: "70%", borderRadius: "15px", marginTop: "10%"}}>
                <h4>Feb 28, 2017</h4>
                <div>
                  <h5 style={{fontWeight: "bold"}}>Nutrient Totals</h5>
                  <p>Carbohydrate: 27g <br/>
                  Fat: 18g <br/>
                  Protein: 16g<br/>
                  Fiber: 5g</p>
                </div>
                <h5 style={{fontWeight: "bold"}}>Energy Balance</h5>
              <p>Calories consumed: 2000<br/>
                 Calories burned: 400<br/>
                 Result: <span style={{color: "green", fontSize: "30px"}}>-100</span></p>
            </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Summary;
