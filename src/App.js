//Usual imports

import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import $ from 'jquery';
import axios from 'axios';

//The browser router - we wrap the app in it, so that we allow routing
//Also, route
import { BrowserRouter, Route, Switch } from 'react-router-dom';



//Importing the components
import PizzaBuilder from './PizzaBuilder/PizzaBuilder.js';
import IngredientList from './Ingredients/IngredientList.js';
import Layout from './Layout/Layout.js';
import CheckoutPage from './Ordering/CheckoutPage.js';

//Defaults for axios
axios.defaults.baseURL = 'https://burgerapp-a9f69.firebaseio.com';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <div className="appSpacer"></div>
            <Switch>
              <Route path="/" exact component={PizzaBuilder} />
              <Route path="/ingredients" component={IngredientList} />
              <Route path="/checkout" component={CheckoutPage} />
              <Route path="/" component={PizzaBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
