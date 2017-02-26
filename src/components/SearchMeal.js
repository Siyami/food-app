import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class SearchMeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchMeal: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const nextState = {
      // we do this because we have different names if you don't have it we need if()...
      [event.target.name]: event.target.value
    };

    this.setState(nextState);
  }

  handleSubmit(event) {
    event.preventDefault();

    // Perhaps send a JSON string to a server...
    JSON.stringify({
      searchMeal: this.state.searchMeal
    });

    // Reset the form
    this.setState({
      searchMeal: ''
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6} xsOffset={4}>
           <form onSubmit={this.handleSubmit}>
            <label>
              <input
                name="searchMeal"
                onChange={this.handleChange}
                type="text"
                value={this.state.searchMeal}
              />
            </label>

            <input type="submit" value="Search Meal" />
          </form>

          </Col>
        </Row>

      </Grid>
    )
  }
}

export default SearchMeal;
