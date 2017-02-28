import React, { Component } from 'react';
import { Grid, Row, Col, Button, Image} from 'react-bootstrap'
import axios from 'axios';
var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

class SearchExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseName: '',
      exercise: '',
      calories: '',
      duration: '',
      photo: '',
      date: moment()
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
    console.log(this.state.date);
  }

  handleChange(event) {
    const nextState = {
      [event.target.name]: event.target.value
    }
    this.setState(nextState)
  }

  handleSubmit(event){
    event.preventDefault();
    axios({
      method: 'post',
      url: 'https://trackapi.nutritionix.com/v2/natural/exercise',
      data: {
        "query": `${this.state.exerciseName}${this.state.exerciseDuration}`,
        "gender": "female",
        "weight_kg": 72,
        "height_cm": 150,
        "age": 22,
      },
      headers: {
        'Content-Type': "application/json",
        'x-app-id': '816ac43f',
        'x-app-key': '15dda15a013d5b7d3ded1167c25c2893',
        'x-remote-user-id': 0
      }
    })
    .then(({data}) => {
      this.setState({
        exercise: data.exercises[0].name,
        calories: data.exercises[0].nf_calories,
        duration: data.exercises[0].duration_min,
        photo: data.exercises[0].photo.thumb

      })
    })
    .catch((err) => {
      console.log(err);
    })
    this.setState({
      exerciseName: '',
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <form onSubmit={this.handleSubmit}>
                <label>
                  <input
                    name="exerciseName"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.exerciseName}
                  />
                </label>
                <select
                  placeholder="select"
                  onChange={this.handleChange}
                  value={this.state.exerciseDuration}
                  name="exerciseDuration"
                  >
                    <option value=" ">Select Time</option>
                    <option value=" 15 minutes">15 minutes</option>
                    <option value=" 30 minutes">30 minutes</option>
                    <option value=" 45 minutes">45 minutes</option>
                    <option value=" 60 minutes">60 minutes</option>
                    <option value=" 75 minutes">75 minutes</option>
                    <option value=" 90 minutes ">90 minutes</option>
                    <option value=" 120 minutes ">120 minutes</option>
                  </select>
                  <input type="submit" value="Search"/>
                </form>
              </Col>
            </Row>
          </Grid>
          <div>

            { (this.state.exercise) ? (
              <Grid>
                <Row>
                  <Col>
                    <div>
                      <h2>
                        {this.state.exercise}
                      </h2>
                      <p>for</p>
                      <p>{this.state.duration} minutes</p>
                      <Image src={this.state.photo}
                        rounded
                        responsive />
                      <p>
                        `You burned {this.state.calories} calories!`
                      </p>
                      <DatePicker
                        dateFormat="YYYY/MM/DD"
                        placeholderText="Click to select a date"
                        selected={this.state.date}
                        onChange={this.handleDateChange} />
                        <Button bsStyle="success">Add Exercise</Button>
                      </div>
                    </Col>
                  </Row>
                </Grid>
              )
              : (<Grid>
                <Row>
                  <Col>
                    <div>
                      <h3>Enter an excercise</h3>
                    </div>
                  </Col>
                </Row>
              </Grid>)
            }
          </div>
        </div>
      )
    }
  }

export default SearchExercise;
