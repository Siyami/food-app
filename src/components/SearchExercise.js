import React, { Component } from 'react';
import { Grid, Row, Col, Image} from 'react-bootstrap'
import axios from 'axios';
var moment = require('moment');

class SearchExercise extends Component {
  constructor(props) {
    super(props)

    this.state = {
      exerciseName: '',
      exerciseDuration: '',
      exercise: '',
      calories: '',
      duration: '',
      photo: '',
      date: '',
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.addExercise = this.addExercise.bind(this)
    this.truncateDate = this.truncateDate.bind(this)
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
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
      console.log(data)
      this.setState({
        exercise: data.exercises[0].name,
        calories: data.exercises[0].nf_calories,
        duration: data.exercises[0].duration_min,
        photo: data.exercises[0].photo.thumb,
        date: moment()._d.toString().slice(0,15)
      })
    })
    .catch((err) => {
      console.log(err);
    });

    this.setState({
      exerciseName: '',
    });
  }

  addExercise(){
    axios({
  method: 'post',
  url: '/api/exercises',
  data: {
    date: this.state.date,
    photo: this.state.photo,
    exercise: this.state.exercise,
    duration: this.state.duration,
    calories: this.state.calories
      }
    })
    this.setState({
      exercise: '',
    });
  }

  truncateDate(date){
    date.substring(0, 14)
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>

            <Col xs={6} xsOffset={4} className="spacer">
              <form onSubmit={this.handleSubmit}>
                <div className="spacer">
                <label>
                  <input name="exerciseName" onChange={this.handleChange}
                    type="text" value={this.state.exerciseName}/>
                  </label>
                </div>
                <div className="spacer">
                  <h4>Select Duration:</h4>
                </div>
                <div className="spacer">

                  <select
                    placeholder="select"
                    onChange={this.handleChange}
                    value={this.state.exerciseDuration}
                    name="exerciseDuration">
                    <option value=" 15 minutes">15 minutes</option>
                    <option value=" 30 minutes">30 minutes</option>
                    <option value=" 45 minutes">45 minutes</option>
                    <option value=" 60 minutes">60 minutes</option>
                    <option value=" 75 minutes">75 minutes</option>
                    <option value=" 90 minutes ">90 minutes</option>
                    <option value=" 120 minutes ">120 minutes</option>
                  </select>
                </div>
                <div className="spacer">
                  <input type="submit" value="Search" placeholder="enter an activity"/>
                </div>
                </form>
              </Col>

            </Row>
          </Grid>
          <div>

            { (this.state.exercise) ? (
              <Grid>
                <Row>
                  <Col xs={6} xsOffset={4} className="spacer">
                    <div>
                      <h2>
                        {this.state.exercise}!
                      </h2>

                      <p>for {this.state.duration} minutes</p>
                      <Image className="spacer" src={this.state.photo}
                        rounded
                        responsive />
                        <p>
                          `You burned {this.state.calories} calories!`
                        </p>
                        <a href="/exerciselog">
                        <button onClick={this.addExercise}>Add Exercise</button>
                      </a>
                      </div>
                    </Col>
                    <Col xsHidden md={3}></Col>
                  </Row>
                </Grid>
              )
              : (<Grid>
                <Row className="show-grid">
                  <Col xs={6} xsOffset={4}>
                    <div>
                      <h3>Enter an excercise</h3>
                    </div>
                  </Col>
                </Row>
              </Grid>)
            }
          </div>
          <Grid>
            <Row>
              <Col>

              </Col>
            </Row>
          </Grid>

        </div>
      )
    }
  }

export default SearchExercise;
