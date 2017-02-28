import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.js';
import Home from './Home.js';
import SearchMeal from './SearchMeal';
import Login from './Login';
import SearchExercise from './SearchExercise';
import Summary from './Summary'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="searchmeal" component={SearchMeal}/>
    <Route path="login" component={Login} />
    <Route path="searchexercise" component={SearchExercise}/>
    <Route path="summary" component={Summary}/>
  </Route>
);
