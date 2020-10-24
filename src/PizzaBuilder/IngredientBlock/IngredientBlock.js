import React from 'react';

//Ingredients needed
import IngredientIndividual from './IngredientIndividual.js';



const IngredientBlock = (props) => {

  //The classes for the button
  //Add disabled if that is the case.
  let classesButtonCheckout = "btn btn-primary";
  let classesButtonSave = "btn btn-success";

  //If no checkout, disabled class as well
  if(!props.checkoutEnabled)
  {
    classesButtonCheckout += " disabled";
  }

  if(!props.savingEnabled || !props.checkoutEnabled)
  {
    classesButtonSave += " disabled";
  }

  /*
    Possible options for the saving of the pizza:
    - number is 0, is not saved -> no text
    - number is non-zero, not saved -> unsaved [red]
    - number is non-zero, saved -> saved, show number [green]
  */
  let text = "";
  let color = {color: 'black'};

  if(props.pizzaConfirmationNumber != 0)
  {
    if(!props.savingEnabled)
    {
      color = {color: 'green'};
      text = "Your pizza configuration has been saved. Your number is: " + props.pizzaConfirmationNumber;
    }
    else
    {
      color = {color: 'red'};
      text = "Your pizza configuration hasn't been saved.";
    }
  }




  return(
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your pizza</span>
        <span className="badge badge-secondary badge-pill">{props.totalPrice}$</span>
        <button type="button" className="btn btn-warning" onClick={props.resetHandler}>Reset pizza</button>
      </h4>
      <ul className="list-group mb-3">
        {
            Object.keys(props.ingredientsInfo).map((aKey, index) => {
              return(
                <IngredientIndividual
                  name={props.ingredientsInfo[aKey].display}
                  price={props.ingredientsInfo[aKey].price}
                  quantity={props.pizzaComposition[aKey]}
                  key={aKey + '-' + index}
                  type={aKey}
                  clickHandler={props.clickHandler}
                   />
              );
            })
        }
        <li className="list-group-item d-flex justify-content-between bg-light">
          <span>Total</span>
          <strong>{props.totalPrice}$</strong>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <button type="button" className={classesButtonSave} onClick={() => {if(props.checkoutEnabled && props.savingEnabled){props.saveHandler();}}}>Save Pizza</button>
          <button type="button" className={classesButtonCheckout} onClick={() => {if(props.checkoutEnabled){props.checkoutHandler(true);}}}>Checkout</button>
        </li>
        <li className="list-group-item d-flex justify-content-between">
        <button type="button" className="btn btn-dark" onClick={props.toggleLoadWindow}>Load pizza</button>
        </li>
      </ul>
      <p className="notificationSaving" style={color}>
        {text}
      </p>
    </div>
  );
};

export default IngredientBlock;
