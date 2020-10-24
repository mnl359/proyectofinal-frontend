//Special component that we will use for input fields

/*
  Possible types:
  - input => has a config, value, and handler
  - textarea => has a config, value, handler
  - select => has a config in which we have options, options have value
              and display value,change handler
  - checkbox => has a value and a dislplay value, also a handler
  - radiobox => has a config in which we have options, options have value
              and display value, change handler

*/

import React from 'react';

const input = (props) => {
  //Logic to determine what type of input we're going to use
  let inputElement = null;

  //Switch with cases
  switch(props.type)
  {
    //Covers input AND checkbox
    //Checkbox - checked="checked" and disabled possible
    //Radio buton - name="someName" when they belong to the same category
    case('input'):
    case('checkbox'):
      inputElement =
      <input
        className="form-control"
        {...props.elementConfig}
        value={props.value}
        onChange={props.specificHandler || props.changed}
      />
      ;
    break;
    case('textarea'):
      inputElement =
      <textarea
        className="form-control"
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      ;
    break;
    case('select'):
      inputElement =
        <select
          className="form-control"
          value={props.value}
          onChange={props.changed}
        >
          {
            props.elementConfig.options.map((anOption, index) => (
              <option key={anOption.value + index} value={anOption.value}>
                {anOption.displayValue}
              </option>
            ))
          }
        </select>
      ;
    break;
    case('radio'):
      inputElement =
        <div className="radioContainer">
        {
          props.elementConfig.options.map((anOption, index) => (
              <div className="radioSingle" key={props.id+index+'radio'}>
                <input type="radio"
                  name={props.elementConfig.name}
                  value={anOption.value}
                  checked={anOption.checked}
                  onChange={() => {props.specificHandler(index)}}
                />
                <label>{anOption.displayValue}</label>
              </div>
          ))
        }
        </div>
      ;
    break;
    default:
      inputElement =
      <input
        className="form-control"
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        placeholder={'...'}
      />
      ;
    break;
  }

  //Returns JSX, whitin variable that we declared + standard packaging
  return (
    <div className="inputElement ">
      <label className="inputElementLabel">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
