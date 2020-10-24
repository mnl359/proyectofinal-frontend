import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Reducers
import pizzaR from './store/reducers/pizzaComposition.js';
import pizzaB from './store/reducers/pizzaBuild.js';

//Store and combine reducers (since using more than 1)
//Also provider so we can give the store to it
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

//Reducers
const rootReducer = combineReducers({
    pizzaReducer: pizzaR,
    pizzaBuild: pizzaB,
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
