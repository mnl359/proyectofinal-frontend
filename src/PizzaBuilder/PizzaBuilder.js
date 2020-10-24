//Recall that not only React, but also { Component } is needed from react
//When we want to declare a stateful component (with class)
import axios from 'axios';
import React, { Component } from 'react';

import { ingredientsInfoStatic, pizzaCrustImage } from './../Special/IngredientsInfo.js';


//Import needed components
import IngredientBlock from './IngredientBlock/IngredientBlock.js';
import ShowScreen from './ShowScreen/ShowScreen.js';
import OrderSummary from './../Ordering/OrderSummary.js';
import PizzaLoader from './../Loading/PizzaLoader.js';

//Connect with Redux
import { connect } from 'react-redux';
//Import the actions
import * as actions from './../store/actions/actions.js';



class PizzaBuilder extends Component
{

  //We're going to need to call the constructor so we can construct our state
  //Based on the info above.
  constructor(props)
  {
    super(props);
    this.state = {
      ingredientsInfo: {...ingredientsInfoStatic},
      basePrice: 3.00,
      checkoutPageActivated: false,
      loadWindowActivated: false,
    };
    this.fillPizzaComposition();

  }




  //Fill the pizza composition now
  //Note: when in constructor, we need to directly modify the state!
  fillPizzaComposition = () =>
  {
    this.props.onLoadInitialComposition(this.generateEmptyPizza());
  };

  //Generates an empty pizza
  generateEmptyPizza = () =>
  {
    let tempPizzaObject = {};

    let keysArray = Object.keys(this.state.ingredientsInfo);
    for(let i=0; i<keysArray.length; i++)
    {
      tempPizzaObject[keysArray[i]] = 0;
    }

    return tempPizzaObject;
  };



  //Calculate total price
  calculateTotalPrice = () =>
  {
    let total = this.state.basePrice;
    let keysIngredients = Object.keys(this.props.pizzaComposition);
    for(let i=0; i<keysIngredients.length; i++)
    {
      total += this.props.pizzaComposition[keysIngredients[i]]*this.state.ingredientsInfo[keysIngredients[i]].price;
    }

    return parseFloat(Math.round(total * 100) / 100).toFixed(2);
  };

  //Click handler method in PizzaBuilder which contains IngredientBlock
  //which in turn contians
  //Note: we take care of the logic here since we need to activate other
  //parts of state (saving enabled, checkout enabled, etc)
  clickHandler = (type, value) =>
  {
    //If the value is true, then we increment
    if(value)
    {
      //Increment? always
      this.props.onIncrementIngredient(type);
      this.props.pizzaSavedHandler(false);
    }
    else
    {
      //Decrement? only if not 0!
      if(this.props.pizzaComposition[type] > 0)
      {
        this.props.onDecrementIngredient(type);
        this.props.pizzaSavedHandler(false);
      }
    }

    this.checkoutPageToggler(false);
  };

  //Enable or disable button based on a condition
  //Now: only crust
  enableCheckoutButton = () =>
  {
    return this.calculateTotalPrice() !== parseFloat(Math.round(this.state.basePrice * 100) / 100).toFixed(2);
  };

  //Reset the pizza
  resetPizza = () =>
  {
    this.props.onLoadInitialComposition(this.generateEmptyPizza());
    this.props.pizzaSavedHandler(false);
    this.checkoutPageToggler(false);

  };

  //Modify the checkoutActivated
  checkoutPageToggler = (bool) =>
  {
    this.setState({checkoutPageActivated: bool});
  };

  //Component did mount
  componentDidMount = () =>
  {
    let currentScope = this;

    axios.get('/ingredientPrices.json')
    .then((response) => {
      //Update the prices now
      //For each ingredient, modify its price
      let tempIngredientsInfo = this.state.ingredientsInfo;
      Object.keys(response.data).map(aKey => {
        tempIngredientsInfo[aKey].price = response.data[aKey].price;
      });

      //However, this is a nested object so re-render not executed!
      this.setState({ingredientsInfo: tempIngredientsInfo});

    })
    .catch((error) => {console.log('Error fetching info', error)});
  };

  //Save the pizza -> just value
  savePizzaConfiguration = () =>
  {
    //Depending on the confirmation number, different operations:
    if(this.props.pizzaBuild.confirmationNumber != 0)
    {
      axios.put('/savedPizza/' + this.props.pizzaBuild.confirmationNumber + ".json", {pizzaComposition: this.props.pizzaComposition})
      .then((response) => {
        this.props.pizzaSavedHandler(true);
      })
      .catch((error) => {console.log('Error saving pizza', error)});
    }
    else
    {
      //post - first time
      axios.post('/savedPizza.json', {pizzaComposition: this.props.pizzaComposition})
      .then((response) => {
        this.props.pizzaSavedHandler(true);
        this.props.pizzaConfirmationNumberHandler(response.data.name);
      })
      .catch((error) => {console.log('Error saving pizza', error)});
    }

  };

  //Open up the load window
  toggleLoadWindow = () =>
  {
    let tempValue = this.state.loadWindowActivated;
    this.setState({loadWindowActivated: !tempValue});
  };

  //Load info that was fetched  - in this case, pizza composition
  loadPizzaComposition = (newComposition, newNumber) =>
  {
    this.props.onLoadInitialComposition(newComposition);
    this.toggleLoadWindow();
    this.props.pizzaConfirmationNumberHandler(newNumber);
    this.props.pizzaSavedHandler(true);
  };


  //The render method returns JSX that we print

  //!Note: to cycle through an object with map (for printing in render),
  //Use the Object.keys(theObj) tactic!
  render(){

    //Check if order window is allowed
    let orderWindow = null;

    if(this.enableCheckoutButton() && this.state.checkoutPageActivated)
    {
      orderWindow = <OrderSummary
                      checkoutPageToggle={this.checkoutPageToggler}
                      ingredientsInfo={this.state.ingredientsInfo}
                      pizzaComposition={this.props.pizzaComposition}
                      totalPrice={this.calculateTotalPrice()}
                      />;
    }


    //Check if loading window on
    let loadWindow = null;
    if(this.state.loadWindowActivated)
    {
      loadWindow = <PizzaLoader toggleLoadWindow={this.toggleLoadWindow}  loadPizzaComposition={this.loadPizzaComposition }/>;
    }

    return(
      <main role="main" className="container">
        {loadWindow}
        <div className="container">

              {orderWindow}

              <div className="py-5 text-center">
                <h2>Pizza Builder</h2>
                <p className="lead">Here you can build your pizza using the builder with the ingredients provided.</p>
              </div>

              <div className="row">
                  <ShowScreen
                    pizzaComposition={this.props.pizzaComposition}
                    ingredientsInfo={this.state.ingredientsInfo}
                    pizzaCrustImage={pizzaCrustImage}
                   />
                  <IngredientBlock
                    totalPrice={this.calculateTotalPrice()}
                    ingredientsInfo={this.state.ingredientsInfo}
                    pizzaComposition={this.props.pizzaComposition}
                    clickHandler={this.clickHandler}
                    checkoutEnabled={this.enableCheckoutButton()}
                    savingEnabled={!this.props.pizzaBuild.isSaved}
                    resetHandler={this.resetPizza}
                    saveHandler={this.savePizzaConfiguration}
                    checkoutHandler={this.checkoutPageToggler}
                    pizzaConfirmationNumber={this.props.pizzaBuild.confirmationNumber}
                    toggleLoadWindow={this.toggleLoadWindow}
                    />
              </div>

      </div>
      </main>
    );
  };

}

//After the class definition -> that's when we make use of Redux
//We need to map the state (Redux) to this component's props
const mapStateToLocalProps = state => {
  return {
      pizzaComposition: state.pizzaReducer,
      pizzaBuild: state.pizzaBuild,
  };
};

//And also the dispatch actions to props
const mapDispatchActionsToProps = dispatch => {
  return{
    onLoadInitialComposition: (initialComposition) => dispatch({type:actions.COMPOSITION_INITIALIZE, payload: initialComposition}),
    onIncrementIngredient: (ingredientType) => dispatch({type:actions.COMPOSITION_INCREMENT, payload: {ingredient: ingredientType}}),
    onDecrementIngredient: (ingredientType) => dispatch({type:actions.COMPOSITION_DECREMENT, payload: {ingredient: ingredientType}}),
    pizzaSavedHandler: (value) => dispatch({type:actions.BUILD_SAVED, payload: {isSaved: value}}),
    pizzaConfirmationNumberHandler: (value) => dispatch({type:actions.BUILD_CONFIRMATIONNUMBER, payload: {confirmationNumber: value}}),
  }
};


//We still need to export it
export default connect(mapStateToLocalProps, mapDispatchActionsToProps)(PizzaBuilder);
