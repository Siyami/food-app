import React, { Component } from 'react';
import {  Grid, Row, Col, Image, Button, FormControl, ControlLabel, ListGroup, ListGroupItem, FormGroup} from 'react-bootstrap'
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
        "weight_kg": 70,
        "height_cm": 172,
        "age": 25,
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
            <Col xs={6}
              xsOffset={3}
              className="spacer">
              <form onSubmit={this.handleSubmit}>

                  <div className="spacer">
                    <FormGroup>
                    <FormControl  componentClass="select"
                      bsSize="large"
                      style={{width: "50%", margin: "auto"}}
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
                    </FormControl>
                  </FormGroup>
                  </div>

                  <div className="spacer">
                    <div className="spacer">
                      <FormGroup bsSize="large">
                      <FormControl style={{width: "50%", margin: "auto", borderColor: "darkorange" }}
                        bsSize="large"
                        type="text"
                        name="exerciseName"
                        onChange={this.handleChange}
                        value={this.state.exerciseName}>
                      </FormControl>
                    </FormGroup>
                      </div>

                    <Button style={{ width: "40%" }}
                      className="mybtns"
                      type="submit" value="Search"
                      placeholder="enter an activity">Search</Button>
                    </div>
                  </form>
                </Col>
              </Row>
            </Grid>
            <div>

              { (this.state.exercise) ? (
                <Grid>
                  <Row>
                    <Col xs={6}
                      xsOffset={3}
                      className="spacer">
                      <div style={{marginBottom: "80px" }} className="exercise">
                        <h2>
                          {this.state.exercise}!
                        </h2>
                        <h5>for {this.state.duration} minutes</h5>
                        <Image style={{ margin: "auto", width: "200px" }}
                          className="spacer"
                          src={this.state.photo}
                          rounded
                          responsive />
                          <h5>
                            You burned <p style={{ color: "red" }}> <span style={{fontSize: "30px"}}>{this.state.calories} </span></p>calories
                          </h5>
                          <a href="/exerciselog">
                          <Button style={{ width: "50%", marginBottom: "5%"}}
                            className="mybtns"
                            onClick={this.addExercise}>Add Exercise</Button>
                          </a>
                        </div>
                      </Col>
                      <Col xsHidden md={3}></Col>
                    </Row>
                  </Grid>
                )

                : (<Grid>
                  <Row>
                    <Col xs={6} xsOffset={3} md={8} mdOffset={2} style={{textAlign: "center"}}>

                      <ListGroup>
                          <ListGroupItem
                            style={{textAlign: "center",
                            fontSize: "20px",
                            margin: "auto"}}>
                            Please search for an activity.<br/>
                            <span style={{fontSize: "smaller", color: "charcoal"}}>
                              <span style={{fontVariant: "small-caps", fontWeight: "bold"}}>
                                Example</span>: hiking, vacuuming, Bikram Yoga, etc.</span>
                          </ListGroupItem>
                        </ListGroup>
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
