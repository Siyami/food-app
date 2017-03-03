import React, { Component } from 'react';
import { Table, Grid, Row, Col, Thumbnail, Button, DropdownButton, MenuItem, FormControl, FormGroup, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
let moment = require('moment');
import { browserHistory } from 'react-router';
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
      mealDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.calc = this.calc.bind(this);
    this.postMeal = this.postMeal.bind(this);
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
      // console.log(data.foods[0]);
      this.setState({
        searchedMeal:
        {
          mealCalories: data.foods[0].nf_calories,
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
        mealDate: moment()._d.toString().slice(0,15),
        totals: {
          saturatedFat: 0,
          sodium: 0,
          carbonhydrate: 0,
          sugar: 0,
          fiber: 0,
          protein: 0,
          totalFat: 0,
          mealCalories: 0
        }
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
    const totals = {
      saturatedFat: this.calc(newMeals, 'saturatedFat'),
      sodium: this.calc(newMeals, 'sodium'),
      carbonhydrate: this.calc(newMeals, 'carbonhydrate'),
      sugar: this.calc(newMeals, 'sugar'),
      fiber: this.calc(newMeals, 'fiber'),
      protein: this.calc(newMeals, 'protein'),
      totalFat: this.calc(newMeals, 'totalFat'),
      mealCalories: this.calc(newMeals, 'mealCalories')
    }
    this.setState({
      addedMeals: newMeals,
      totals
    })
  }
  removeItem(meal) {
    // console.log(meal);
    let index = this.state.addedMeals.indexOf(meal)
    const newArr = [...this.state.addedMeals]
    newArr.splice(index, 1)
    const totals = {
      saturatedFat: this.calc(newArr, 'saturatedFat'),
      sodium: this.calc(newArr, 'sodium'),
      carbonhydrate: this.calc(newArr, 'carbonhydrate'),
      sugar: this.calc(newArr, 'sugar'),
      fiber: this.calc(newArr, 'fiber'),
      protein: this.calc(newArr, 'protein'),
      totalFat: this.calc(newArr, 'totalFat'),
      mealCalories: this.calc(newArr, 'mealCalories')
    }
    this.setState({
      addedMeals: newArr,
      totals
    })
  }
  // Post totals for a meal to meals table
  postMeal() {
    axios({
      method: 'post',
      url: '/api/meals',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { totals: this.state.totals, mealDate: moment()._d.toString().slice(0,15)}
    })
    .then((res) => {
      console.log(res);
      browserHistory.push('/')
    })
    .catch((err) => {
      console.log(err);
    })
  }
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
            <form onSubmit={this.handleSubmit}>


                <FormGroup bsSize="large">

                  <FormControl type="text"
                    className="mealinput"
                    style={{ width: "100%", borderColor: "darkorange" }}
                    name="searchMeal"
                    onChange={this.handleChange}
                    value={this.state.searchMeal}/>
                </FormGroup>


              <Button className="mybtns" style={{ width: "70%", marginBottom:"30px"}}  type="submit" value="Search Meal">Search</Button>

            </form>
            </Col>
          </Row>
        </Grid>
        <div>
          {
            (this.state.photo)
            ? (<Grid>
              <Row>
              <Col xs={12} md={4}>
                <ListGroup style={{ textAlign: "left" }}>
                    <ListGroupItem style={{textAlign: "center", width: "70%", fontSize: "20px", margin: "auto"}}>Food Item</ListGroupItem>
                  </ListGroup>



                <Thumbnail style={{marginBottom: "80px"}} src={this.state.photo} alt="242x200">

                  <h3 style={{textTransform: "capitalize"}}>{this.state.foodName}</h3>
                  <p>{`Serving Unit: ${this.state.servingUnit}`}</p>
                  <p>{`Serving Quantity: ${this.state.servingQuantity}`}</p>
                  <p>{`Consumed At: ${this.state.mealDate}`}</p>

                  <div style={{textAlign: "center"}}>
                    <Button bsStyle="danger" onClick={this.addItemToList}>Add to the Meal</Button>&nbsp;
                  </div>

                </Thumbnail>
              </Col>
              <Col xs={12} md={8} >
                <ListGroup>
                    <ListGroupItem style={{textAlign: "center", width: "50%", fontSize: "20px", margin: "auto"}}>Nutritional Data</ListGroupItem>
                  </ListGroup>
                <Table style={{backgroundColor: "white", borderRadius: "10px"}} bordered condensed hover responsive>
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
                          <td style={{fontSize: "20px", textTransform: "capitalize"}}>{meal.foodName}</td>
                          <td>{meal.saturatedFat}</td>
                          <td>{meal.sodium}</td>
                          <td>{meal.carbonhydrate}</td>
                          <td>{meal.sugar}</td>
                          <td>{meal.fiber}</td>
                          <td>{meal.protein}</td>
                          <td>{meal.totalFat}</td>
                          <td>{meal.mealCalories}</td>
                          <td><Button onClick={() => {this.removeItem(meal)}}><Glyphicon style={{ color: "red" }} glyph="remove"/>Remove</Button></td>
                        </tr>
                        )
                      })}
                      <tr>
                          <td>Total</td>
                          <td>{this.state.totals.saturatedFat}</td>
                          <td>{this.state.totals.sodium}</td>
                          <td>{this.state.totals.carbonhydrate}</td>
                          <td>{this.state.totals.sugar}</td>
                          <td>{this.state.totals.fiber}</td>
                          <td>{this.state.totals.protein}</td>
                          <td>{this.state.totals.totalFat}</td>
                          <td>{this.state.totals.mealCalories}</td>
                      </tr>
                    </tbody>
                  </Table>

                  <div style={{textAlign: "center"}}>
                    <a href="/summary">
                      <Button style={{marginBottom: "80px"}} bsStyle="danger" onClick={() => {this.postMeal()}}>Save Meal</Button>
                    </a>
                  </div>

                </Col>
              </Row>
            </Grid>)
            : (<Grid>
              <Row>
                <Col xs={6} xsOffset={3} md={8} mdOffset={2} style={{textAlign: "center"}}>
                  <ListGroup>
                      <ListGroupItem
                        style={{textAlign: "center",
                        fontSize: "20px",
                        margin: "auto"}}>
                        Please search for a food item.<br/>
                        <span style={{fontSize: "smaller", color: "charcoal"}}><span style={{fontVariant: "small-caps"}}>Example</span>: "1 egg", "pineapple", "veggie burger", "3 Snickers Bars" etc</span>
                      </ListGroupItem>
                    </ListGroup>
                </Col>
              </Row>
              </Grid>)
          }
        </div>
      </div>
    )
  }
  calc(meals, toAdd) {
    return meals.reduce((result, meal) => {
      return (parseFloat(result) + parseFloat(meal[toAdd])).toFixed(2)
    }, 0)
  }
}
export default SearchMeal;
