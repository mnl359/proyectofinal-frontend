import React from 'react';

//For a functional component only, we will give it an anonymous function
//Here ES6 -  arrow function, with props. It returns the JSX

//Note: to pass a boolean prop, use {true}

//Link
import { NavLink } from 'react-router-dom';

const navBar = (props) => {
  return(
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <NavLink className="navbar-brand mainOne" to="/" exact>Pizza Builder</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <NavLink className="navbar-brand" to="/" exact activeClassName="activeLink">Build your pizza</NavLink>
          <NavLink className="navbar-brand" to="/Ingredients" activeClassName="activeLink">Ingredients</NavLink>
          <NavLink className="navbar-brand" to="/#" exact activeClassName="activeLink">Authentication</NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default navBar;
