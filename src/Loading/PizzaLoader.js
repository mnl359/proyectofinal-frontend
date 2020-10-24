import React, { Component }  from 'react';
import Modal from './../Special/Modal.js';
import axios from 'axios';

class PizzaLoader extends Component
{
  //Mandatory constructor since binding
  constructor(props)
  {
    super(props);
    this.state =
    {
      userInput: '',
      loading: false,
      hasError: false,
    };

  }

  //handler for change in input
  handleInputChange = (event) =>
  {
    this.setState({userInput: event.target.value});
  };

  //And the submit button
  handleSubmitButton = (event) =>
  {
    event.preventDefault();
    this.setState({loading: true});
    this.setState({hasError: false});
    this.fetchPizzaInfo(this.state.userInput);
  };

  //Fetch the pizza info here
  fetchPizzaInfo = (token) =>
  {
    //Just so that not all info is fetched
    if(token == "")
    {
      token = "1";
    }

    axios.get('/savedPizza/' + token + ".json")
    .then((response) => {
      //Stopped loading
      this.setState({loading: false});

      //Not null - a Pizza was found then
      if(response.data && response.data != null)
      {
        this.props.loadPizzaComposition(response.data.pizzaComposition, token);
      }
      else
      {
        //Else - no such result.
        this.setState({hasError: true});
      }

    })
    .catch((error) => {
      console.log('Error saving pizza', error);
      this.setState({loading: false});
    });
  };


  //Render method renders the jsx
  render = () =>
  {
    let errorMsg;

    //Determine if there's an error with the loading
    if(this.state.hasError)
    {
      errorMsg= <span style={{color: 'red'}}>Invalid number</span>;
    }


    let whatToShow =
      <>
        <h6>Load a pizza using a configuration number:</h6>
        <span id="closeWindow" onClick={this.props.toggleLoadWindow}><i className="fa fa-times-circle-o" aria-hidden="true"></i></span>
        <form className="form-inline">
          <input
            type="text"
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            id="inlineFormInput"
            placeholder="Configuration Number"
            value={this.state.userInput}
            onChange={this.handleInputChange}
            />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmitButton}
            >Submit</button>
        </form>
        {errorMsg}
      </>
      ;

    if(this.state.loading)
    {
      whatToShow = <div className="loader"></div>;
    }


    return(
      <Modal>
        {whatToShow}
      </Modal>
    );
  };
}
export default PizzaLoader;
