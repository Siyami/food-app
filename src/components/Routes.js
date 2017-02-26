import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.js';
import Home from './Home.js';
import SearchMeal from './SearchMeal';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="searchmeal" component={SearchMeal}/>
  </Route>
);
