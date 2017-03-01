import React, { Component } from 'react';
import { Table, Grid, Row, Col, Thumbnail, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios';
let moment = require('moment');

class SearchMeal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchMeal: '',
      searchedMeal: {},
      addedMeals: [],
      photo: '',
      foodName: '',
      servingUnit: '',
      date: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.calc = this.calc.bind(this);

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
      console.log(data.foods[0]);

      this.setState({
        searchedMeal:
        {
          calories: data.foods[0].nf_calories,
          cholesterol: data.foods[0].nf_cholesterol,
          fiber: data.foods[0].nf_dietary_fiber,
          potassium: data.foods[0].nf_potassium,
          protein: data.foods[0].nf_protein,
          saturatedFat: data.foods[0].nf_saturated_fat,
          sodium: data.foods[0].nf_sodium,
          sugar: data.foods[0].nf_sugars,
          carbonhydrate: data.foods[0].nf_total_carbohydrate,
          totalFat: data.foods[0].nf_total_fat,
          foodName: data.foods[0].food_name
        },
        photo: data.foods[0].photo.thumb,
        foodName: data.foods[0].food_name,
        servingUnit: data.foods[0].serving_unit,
        servingQuantity: data.foods[0].serving_qty,
        date: moment()._d.toString().slice(0,15)
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

  addItemToList() {
    const newMeals = this.state.addedMeals.concat([this.state.searchedMeal])
    this.setState({
      addedMeals: newMeals
    })
  }

  removeItem(meal) {
    console.log(meal);
    let index = this.state.addedMeals.indexOf(meal)
    const newArr = [...this.state.addedMeals]
    newArr.splice(index, 1)
    this.setState({
      addedMeals: newArr
    })
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
                <Col xs={12} md={4} >
                  <h2>Meal Details</h2>
                  <Thumbnail src={this.state.photo} alt="242x200">
                    <h3>{this.state.foodName}</h3>
                    <p>{`Serving Unit: ${this.state.servingUnit}`}</p>
                    <p>{`Serving Quantity: ${this.state.servingQuantity}`}</p>
                    <p>{`Consumed At: ${this.state.date}`}</p>

                      <Button bsStyle="primary" onClick={this.addItemToList}>Add to the List</Button>&nbsp;

                      <DropdownButton bsStyle="primary" title="Change Quantity" id="dropdown-size-medium">
                        <MenuItem eventKey="1">1</MenuItem>
                        <MenuItem eventKey="2">2</MenuItem>
                        <MenuItem eventKey="3">3</MenuItem>
                        <MenuItem eventKey="4">4</MenuItem>
                        <MenuItem eventKey="5">5</MenuItem>
                      </DropdownButton>

                  </Thumbnail>
                </Col>

                <Col xs={12} md={8} >
                  <h2>Nutritional Data</h2>
                  <Table striped bordered condensed hover responsive>
                    <thead>
                      <tr>
                        <th>Meal Item</th>
                        <th>Sat. Fat</th>
                        <th>Sodium</th>
                        <th>Carbs</th>
                        <th>Sugar</th>
                        <th>Fiber</th>
                        <th>Protein</th>
                        <th>Fat</th>
                        <th>Calories</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.addedMeals.map((meal) => {
                        return (
                          <tr>
                            <td>{meal.foodName}</td>
                            <td>{meal.saturatedFat}</td>
                            <td>{meal.sodium}</td>
                            <td>{meal.carbonhydrate}</td>
                            <td>{meal.sugar}</td>
                            <td>{meal.fiber}</td>
                            <td>{meal.protein}</td>
                            <td>{meal.totalFat}</td>
                            <td>{meal.calories}</td>
                            <td><Button bsStyle="primary" onClick={() => {this.removeItem(meal)}}>Remove</Button></td>
                          </tr>
                        )
                      })}
                      <tr>
                          <td>Total</td>
                          <td>{this.calc('saturatedFat')}</td>
                          <td>{this.calc('sodium')}</td>
                          <td>{this.calc('carbonhydrate')}</td>
                          <td>{this.calc('sugar')}</td>
                          <td>{this.calc('fiber')}</td>
                          <td>{this.calc('protein')}</td>
                          <td>{this.calc('totalFat')}</td>
                          <td>{this.calc('calories')}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button bsStyle="primary">Save Meal</Button>
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
  calc(toAdd) {
    return this.state.addedMeals.reduce((totalCals, meal) => {
      return parseInt(totalCals + meal[toAdd])
    }, 0)
  }
}

export default SearchMeal;
