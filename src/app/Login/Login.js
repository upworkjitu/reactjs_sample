import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { printLogMessages, makeGETRequest } from '../utility/RestProvider';

import './Login.css';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      toDashboard: false
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(evt) {
    
    evt.preventDefault();

    if (!this.state.username) {
      alert("Username is required");
      return;

    }

    if (!this.state.password) {
      alert("Password is required");
      return;
    }

    this.validateStarWarsUser();

  }
/**
 * @description function validateStarWarsUser validates star war user
 */
  validateStarWarsUser(){

      makeGETRequest('people', (response) => {
              if(response.hasOwnProperty("data")){
                  
                let peoplesArray = response.data.results;
      
                if(this.isUserExist(peoplesArray)){
      
                    printLogMessages("Valid User.");
                    this.setState({toDashboard: true});
                }
                else{
        
                    alert("Invalid Username or Password.");
      
                }
                
        
            }
            else{
      
              alert("User does not exist.");
      
            }

        },
        (error) => {
          alert("Internal server error.");
        }
        );
  }

  /**
   * @desc function takes array of people and validates if user exist in that array
   * @param {*} peoplesArray 
   */
  isUserExist(peoplesArray){

    for(let _item=0; _item < peoplesArray.length; _item++){

      if(peoplesArray[_item].name === this.state.username && peoplesArray[_item].birth_year === this.state.password){
        
        return true;

      }
    }

    return false;
}

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {

    if (this.state.toDashboard === true) {
      return <Redirect to='/home' />
    }
    return (

        <div className="loginPage">

            <form onSubmit = {this.handleSubmit}>
            <div className="container">
              <div className="form-group">
                <label><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" onChange = {this.handleUserChange}/>
              </div>
              <div className="form-group">
                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" onChange = {this.handlePassChange}/>
              </div>
              <button type="submit" className="submitbutton">Login</button>

            </div>

            </form>

        </div>

    );
  }
}

export default withRouter(LoginPage);