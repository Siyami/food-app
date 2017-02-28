import React, { Component } from 'react';
import { Grid, FormGroup, Button, Col, Form, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }

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
      url: '/api/users',
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }
    })
    .then((res) => {

      //ASK ASK ASK
      this.props.setStateFromLoginComponent()
      console.log(res);
      browserHistory.push('/')
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <Grid>
        <Form onSubmit={this.handleSubmit} horizontal style={{margin: "10% 20%"}}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={6}>
              <FormControl
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={6}>
              <FormControl
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
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
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
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
                Sign Up
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Grid>
    );
  }
}

export default SignUp;
