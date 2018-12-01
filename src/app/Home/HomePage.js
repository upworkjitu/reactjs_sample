import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody,
  CardTitle, Button,CardFooter,CardSubtitle, Navbar , } from 'reactstrap';

import { Redirect } from 'react-router-dom';
import { printLogMessages, makeGETRequest } from '../utility/RestProvider';
import './HomePage.css';

class HomePage extends Component {


 
  constructor(props) {
    super(props);

    this.state = {
      planetsList: [],
      isLogout: false,
      isPlanetDetail: false,
      planetURL : ''
    };

  }


  /**
   * function _handleSearchKeyPress called on onKeyUP event listener on search box
   * @param {*} event 
   */
  _handleSearchKeyPress(event){

    printLogMessages("key pressed" + event.target.value);


   makeGETRequest('planets/?search=' + event.target.value, 
   
     (response) => {

            let planetsArray = response.data.results;
            let sortedArray = [];
            
            for(let _item=0; _item < planetsArray.length; _item++){
              if(planetsArray[_item].population !== "unknown"){
                sortedArray.push(planetsArray[_item]);
              }
             }

             //sort array in descending order for population
            sortedArray.sort((a, b) =>  
              b.population -  a.population
            );
              

            this.setState({planetsList: sortedArray});
            printLogMessages(JSON.stringify(sortedArray));

        
    },
    (error) => {
        alert("No data available for this search.");
    }
);

  }

  /**
   * function navigates user to login page
   * @param {*} itemIndex 
   */
  
  _displayLoginPage(){

    this.setState({isLogout: true});

  }

  _displayPlanetDetail(itemIndex){

    printLogMessages(JSON.stringify(this.state.planetsList[itemIndex]));
    let planetURL = this.state.planetsList[itemIndex].url;
    this.setState({
         planetURL: planetURL,
         isPlanetDetail: true
      });
  }

  render() {

    
    if (this.state.isLogout === true) {
      return <Redirect to='/login' />
    }

    if (this.state.isPlanetDetail) {
      return <Redirect to={{
          pathname: '/planetdetail',
          state: { planetURL: this.state.planetURL }
      }}
     />
  }
    return (
    <div className="container">
      <Navbar color="light" light expand="md">
      <Button outline size="sm" color="danger" className="ml-auto" onClick={() => this._displayLoginPage()}>
      Logout
      </Button>

        </Navbar>
        <div className="searchPage">
            <input type="text" id="myInput" placeholder="Search for planets.." title="Type in a name" onKeyUp={(evt) => {this._handleSearchKeyPress(evt)}}/>
            <div>

                 {

this.state.planetsList.map((itemObject, _index) => {

    let reduceWidthPx = _index * 10 + 'px';
    return (

                      <div key = {_index} className="cardWrapper" style= {{ width: 'calc(80% - ' + reduceWidthPx +  ')'}}>

                          <Card outline color="success">
                          <CardHeader>{ itemObject.name }</CardHeader>
                          <CardBody>
                            <CardTitle>Population: { itemObject.population }</CardTitle>
                            <CardSubtitle>Diameter: { itemObject.diameter }</CardSubtitle>
                            <CardText>Created on: { itemObject.created }</CardText>
                            
                          </CardBody>
                          <CardFooter className="text-muted"><Button color="success" onClick={() => this._displayPlanetDetail(_index)} >View</Button></CardFooter>
                          </Card>
                    
                      </div>
    )

                 })

                
                
                }

            </div>
        </div>
    </div>
    );

  }
}

export default HomePage;
