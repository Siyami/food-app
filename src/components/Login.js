import React, { Component } from 'react';
import { Grid, Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const nextState = {
      [event.target.name]: event.target.value
    };

    this.setState(nextState);
  }

  handleSubmit(event) {
    event.preventDefault();

    axios({
      method: 'post',
      url: '/api/token',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: this.state.email,
        password: this.state.password
      },
       validateStatus: (status) => status < 500
     })
    .then((res) => {
      console.log(res);

      if(res.status < 400) {
        this.props.setStateFromLoginComponent()
        browserHistory.push('/')
      }
      else {
        alert(res.data)
      }

    })
    .catch((err) => {
      console.log(err);
    });

    // Reset the form
    this.setState({
      password: '',
      email: ''
    });
  }

  render() {
    return (
      <Grid>
        <Form onSubmit={this.handleSubmit} horizontal style={{margin: "10% 20%"}}>
          <FormGroup controlId="formHorizontalEmail">
            {/* <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col> */}
            <Col sm={6}>
              <FormControl
                name="email"
                type="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            {/* <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col> */}
            <Col sm={6}>
              <FormControl
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Log in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Grid>
    )
  }
}

export default Login;
