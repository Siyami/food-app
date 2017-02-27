import React, { Component } from 'react';
import { Table, Grid, Row, Col, Thumbnail, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios';

class SearchMeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchMeal: '',
      photo: '',
      foodName: '',
      servingUnit: ''
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
      url: 'https://trackapi.nutritionix.com//v2/natural/nutrients',
      data: {
        "query": this.state.searchMeal,
        "timezone": "US/Eastern"
      },
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': '816ac43f',
        'x-app-key': '15dda15a013d5b7d3ded1167c25c2893',
        'x-remote-user-id': 0
      }
    })
    .then(({data}) => {
      console.log(data.foods);
      this.setState({
        photo: data.foods[0].photo.highres,
        foodName: data.foods[0].food_name,
        servingUnit: data.foods[0].serving_unit,
        servingQuantity: data.foods[0].serving_qty
      })

    })
    .catch((err) => {
      console.log(err);
    });

    //Reset the form
    this.setState({
      searchMeal: ''
    });
  }

  render() {
    return (
      <div>
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

        <div>
          {
            (this.state.photo)
            ? (<Grid>
              <Row>
                <Col xs={12} md={6} >
                  <h2>Meal Details</h2>
                  <Thumbnail src={this.state.photo} alt="242x200">
                    <h3>{this.state.foodName}</h3>
                    <p>{`Serving Unit: ${this.state.servingUnit}`}</p>
                    <p>{`Serving Quantity: ${this.state.servingQuantity}`}</p>

                      <Button bsStyle="primary">Button</Button>&nbsp;

                      <DropdownButton bsStyle="primary" title="Change Quantity" id="dropdown-size-medium">
                        <MenuItem eventKey="1">1</MenuItem>
                        <MenuItem eventKey="2">2</MenuItem>
                        <MenuItem eventKey="3">3</MenuItem>
                        <MenuItem eventKey="4">4</MenuItem>
                        <MenuItem eventKey="5">5</MenuItem>
                      </DropdownButton>


                  </Thumbnail>
                </Col>

                <Col xs={12} md={6} >
                  <h2>Nutritional Data</h2>
                  <Table striped bordered condensed hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Grid>)

            : (<Grid>
                <Row>
                  <Col xs={6} md={5} xsOffset={4}>
                    <h4>Please Search a Meal</h4>
                  </Col>

                </Row>
              </Grid>)
          }
        </div>

      </div>
    )
  }
}

export default SearchMeal;
