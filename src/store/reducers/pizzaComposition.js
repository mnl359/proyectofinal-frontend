//Import the actions
import * as actions from './../actions/actions.js';

/*
    Note: Input controlled error if we leave initialState to {} (empty object)
    since we assign (ex. : .coldCuts) to the input element.
    To circumvent this, import stuff from IngredientsInfo.js and give 0
    to all the keys there (this will be later modified when the app initializes)
*/
import { ingredientsInfoStatic } from './../../Special/IngredientsInfo.js';



//Initial state of the pizza composition: nothing
const initialState = {
};

Object.keys(ingredientsInfoStatic).forEach(key => {
  initialState[key] = 0;
});


//And now, the reducer
const reducer = (state = initialState, action) => {
  //Keep the compiler happy
  let newValue = '';
  let newState = {};
  switch(action.type)
  {
    case actions.COMPOSITION_INITIALIZE:
      return {...action.payload};
    case actions.COMPOSITION_INCREMENT:
      newValue = state[action.payload.ingredient] + 1;
      newState = {...state};
      newState[action.payload.ingredient] = newValue;
      return newState;
    case actions.COMPOSITION_DECREMENT:
      newValue = state[action.payload.ingredient] - 1;
      newState = {...state};
      newState[action.payload.ingredient] = newValue;
      return newState;
    default:
      return state;
  }

  //Redux asks us to return the initial state by default
  //And since all are return statements, no problem
  return state;
};

export default reducer;
