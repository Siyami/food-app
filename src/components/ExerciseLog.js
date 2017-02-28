import React, { Component } from 'react';
import './../App.css';
import { Grid, Row, Col, Image, Table,} from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router';

class ExerciseLog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      myExercises: []
    };
  }

  componentWillMount () {
    axios.get('api/exercises')
    .then(({ data }) => {
      this.setState({
        myExercises: data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
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
                    <th>Table heading</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    (this.state.myExercises).slice(0,50).map(ele => (
                      <tr>
                        <td>{ele.date}</td>
                        <td><Image src={ele.photo}/></td>
                        <td>{ele.exercise}</td>
                        <td>{ele.duation} minutes</td>
                        <td>{ele.calories}</td>
                        <td>Table cell</td>
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
