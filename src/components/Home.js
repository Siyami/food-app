import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router'

class Home extends Component {
  render() {
    return (
      <div>
          <Grid>
            <Row>
              <Col xs={6} xsOffset={3} style={{marginBottom: "20px",
              textAlign: "center"}}>
                <Link to="/searchmeal" >
                  <Button className="mainbuttons" style={{ width: "100%", borderColor: "#6C3049" }} bsSize="large" >Food</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={3} style={{marginBottom: "20px",
              textAlign: "center"}}>
                <Link to="/searchexercise" >
                <Button className="mainbuttons" style={{ width: "100%", borderColor: "#6C3049" }} bsSize="large">Exercise</Button>
              </Link>
              </Col>
            </Row>
            <Row>

              <Col xs={6} xsOffset={3} style={{marginBottom: "20px",
              textAlign: "center"}}>
                <Link to="/summary" >
                <Button className="mainbuttons" style={{ width: "100%", borderColor: "#6C3049" }} bsSize="large">Daily Summaries</Button>
              </Link>
              </Col>
              
            </Row>
          </Grid>
      </div>
    );
  }
}

export default Home;
