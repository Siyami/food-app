import React, { Component } from 'react';
// import {  } from 'react-bootstrap';
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
      }
    })
    .then((res) => {
      console.log(res);
      this.props.setStateFromLoginComponent()
      browserHistory.push('/')

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
      <form onSubmit={this.handleSubmit}>

        <label>
          Email:
          <input
            name="email"
            onChange={this.handleChange}
            type="text"
            value={this.state.email}
          />
        </label>

        <label>
          Password:
          <input
            name="password"
            onChange={this.handleChange}
            type="password"
            value={this.state.password}
          />
        </label>

        <input type="submit" value="Log in" />

      </form>
    )
  }
}

export default Login;
