import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {  } from 'react-bootstrap';

class Summary extends Component {
 constructor(props) {
   super(props);

   this.state = {
     meals: [],
     exercises: [],
     users_meals_exercises: []
   };
 }

 componentWillMount () {
   axios.get('/api/meals')
     .then(({data}) => {
      //  console.log(data);
        this.setState({
          meals: data
        })
      })
     .catch(err => {
       console.log(err)
     });

     axios.get('/api/exercises')
      .then(({data}) => {
        // console.log(data);
        this.setState({
          exercises: data
        })
      })
      .catch(err => {
        console.log(err);
      })

      axios.get('/api/users_meals_exercises')
        .then(({data}) => {
          console.log(data);
          this.setState({
            // users_meals_exercises:
          })
        })
        .catch(err => {
          console.log(err);
        })
 }

 render() {
   return (
     <div>
       <Grid>
             {
               this.state.meals.map((meal) => {
                 return (
                   <div>
                     <Row>
                       <Col xs={6} md={4} xsOffset={4}>
                         <div style={{backgroundColor: "white", padding:"5%", width: "70%", borderRadius: "15px", marginTop: "10%"}}>
                           <h4>{meal.mealDate}</h4>
                           <div>
                             <h5 style={{fontWeight: "bold"}}>Nutrient Totals</h5>
                             <p>
                               Carbohydrate: {meal.carbonhydrate}g <br/>
                               Fat: {meal.totalFat}g<br/>
                               Sat. Fat: {meal.saturatedFat}g<br/>
                               Protein: {meal.protein}g<br/>
                               Fiber: {meal.fiber}g<br/>
                               Sodium: {meal.sodium}mg<br/>
                               {/* Sugar: {meal.sugar}g<br/> */}
                             </p>
                           </div>
                           <h5 style={{fontWeight: "bold"}}>Energy Balance</h5>
                           <p>You need 2000 Calories/day to maintain your weight</p>
                           <p>Calories consumed: {meal.mealCalories}<br/>
                           {this.state.exercises.map((exercise) => {
                             return (
                               <div>
                                 <p>Calories burned: {exercise.calories}</p>
                                 {((parseInt(meal.mealCalories) - parseInt(exercise.calories) - 2000)) < 0
                                   ? (<p style={{color: "green", fontWeight: "bold"}}>Result: {(parseInt(meal.mealCalories) - parseInt(exercise.calories) - 2000) }</p>)
                                 : (<p style={{color: "red", fontWeight: "bold"}}>Result: +{(parseInt(meal.mealCalories) - parseInt(exercise.calories) - 2000) }</p>)}
                               </div>
                             )
                           })}

                           </p>
                         </div>
                       </Col>
                      </Row>

                   </div>

                 )
               })
             }
       </Grid>

     </div>
   )
  }
}

export default Summary;
//
//
// {/* <Grid>
//   <Row>
//     <Col xs={12} md={8} mdOffset={3}>
//       <div style={{backgroundColor: "white", padding:"2%", width: "70%", borderRadius: "15px"}}>
//         <h3> Your weight maintenance calorie goal is 1700</h3>
//       </div>
//     </Col>
//   </Row>
//   <Row>
//     <Col xs={6} md={4} >
//       <div style={{backgroundColor: "white", padding:"5%", width: "70%", borderRadius: "15px", marginTop: "10%"}}>
//         <h4>Feb 26, 2017</h4>
//         <div>
//           <h5 style={{fontWeight: "bold"}}>Nutrient Totals</h5>
//           <p>Carbohydrate: 27g <br/>
//           Fat: 18g <br/>
//           Protein: 16g<br/>
//           Fiber: 5g</p>
//         </div>
//         <h5 style={{fontWeight: "bold"}}>Energy Balance</h5>
//         <p>Calories consumed: 2000<br/>
//         Calories burned: 400<br/>
//         Result: <span style={{color: "green", fontSize: "30px"}}> -100</span></p>
//       </div>
//     </Col>
//     <Col xs={6} md={4} >
//       <div style={{backgroundColor: "white", padding:"5%", width: "70%", borderRadius: "15px", marginTop: "10%"}}>
//         <h4>Feb 27, 2017</h4>
//         <div>
//           <h5 style={{fontWeight: "bold"}}>Nutrient Totals</h5>
//           <p>Carbohydrate: 27g <br/>
//           Fat: 18g <br/>
//           Protein: 16g<br/>
//           Fiber: 5g</p>
//         </div>
//         <h5 style={{fontWeight: "bold"}}>Energy Balance</h5>
//         <p>Calories consumed: 3000<br/>
//         Calories burned: 400<br/>
//         Result: <span style={{color: "red", fontSize: "30px"}}>+500</span></p>
//       </div>
//     </Col>
//     <Col xs={6} md={4} >
//       <div style={{backgroundColor: "white", padding:"5%", width: "70%", borderRadius: "15px", marginTop: "10%"}}>
//         <h4>Feb 28, 2017</h4>
//         <div>
//           <h5 style={{fontWeight: "bold"}}>Nutrient Totals</h5>
//           <p>Carbohydrate: 27g <br/>
//           Fat: 18g <br/>
//           Protein: 16g<br/>
//           Fiber: 5g</p>
//         </div>
//         <h5 style={{fontWeight: "bold"}}>Energy Balance</h5>
//         <p>Calories consumed: 2000<br/>
//         Calories burned: 400<br/>
//         Result: <span style={{color: "green", fontSize: "30px"}}>-100</span></p>
//       </div>
//     </Col>
//   </Row>
// </Grid> */}
