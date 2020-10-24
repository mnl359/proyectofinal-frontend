import React from 'react';

const ingredient = (props) => {
  return(
    <div className="particularIngredient container">
      <h2>This is an ingredient with callname: {props.match.params.theName}</h2>
      <p>And with this particular information, many things are possible :) </p>
    </div>
);
};


export default ingredient;
