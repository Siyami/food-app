import React, { Component } from 'react';
import './../App.css';
import { Button, Grid, Row, Col, Image, Table, Glyphicon} from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router';

class ExerciseLog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      myExercises: []
    };

    this.removeExerercise = this.removeExercise.bind(this)
  }

  componentWillMount () {
    axios.get('api/exercises')
    .then(({ data }) => {
      this.setState({
        myExercises: data
      })
      for (const variable of this.state.myExercises) {
        console.log(variable.id);
      }
      console.log(this.state.myExercises);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeExercise(id){
    axios.delete('api/exercises/'+id, {
      id: id
    })
    for (const variable of this.state.myExercises) {
      if(variable.id === id){
        this.state.myExercises.splice(variable, 1)
      }
    }
    this.setState({
      myExercises: this.state.myExercises
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={4} className="spacer">
              <div style={{backgroundColor: "white", padding:"1%", width: "70%", borderRadius: "10px"}}>
              <h1>Exercise Log</h1>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3} className="spacer">
              <h4>
                <a href="/searchexercise">
                <Button style={{ width: "80%" }} bsSize="large" bsStyle="warning">Add another exercise</Button>
                </a>
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table style={{backgroundColor:"white", borderRadius: "10px" }}responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th></th>
                    <th>Activity</th>
                    <th>Duration</th>
                    <th>Calories Burned</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="exercise-table">

                  {
                    (this.state.myExercises).slice(0,50).map(ele => (
                      <tr key={ele.id}>
                        <td >{ele.date}</td>
                        <td><Image style={{ width: "200px" }}src={ele.photo}/></td>
                        <td className="exercise">{ele.exercise}</td>
                        <td>{ele.duration} minutes</td>
                        <td style={{fontSize: "20px", fontWeight: ""}}>{ele.calories}</td>
                        <td><Button onClick={() => this.removeExercise(ele.id)}><Glyphicon style={{ color: "red" }} glyph="remove"/>Delete</Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3} className="spacer">
              <h4>
                <a href="/searchexercise">
                <Button style={{ width: "50%" }} bsSize="medium" bsStyle="warning">Add another exercise</Button>
                </a>
              </h4>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default ExerciseLog;
