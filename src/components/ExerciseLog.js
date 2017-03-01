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
              <h1>Exercise Log</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={4} className="spacer">
              <h4>
                <a href="/searchexercise">
                  Add another exercise
                </a>
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Activity</th>
                    <th>Duration</th>
                    <th>Calories Burned</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {
                    (this.state.myExercises).slice(0,50).map(ele => (
                      <tr key={ele.id}>
                        <td>{ele.date}</td>
                        <td><Image src={ele.photo}/></td>
                        <td>{ele.exercise}</td>
                        <td>{ele.duration} minutes</td>
                        <td>{ele.calories}</td>
                        <td><Button onClick={() => this.removeExercise(ele.id)}><Glyphicon glyph="remove"/>Delete</Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default ExerciseLog;
