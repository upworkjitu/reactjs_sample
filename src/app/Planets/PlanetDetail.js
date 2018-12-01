import React, { Component } from 'react';
import { Card, CardHeader, CardBody,
  CardTitle, Button,CardFooter,CardSubtitle, Navbar , } from 'reactstrap';

import { Redirect } from 'react-router-dom';
import { printLogMessages, makeGETRequest } from '../utility/RestProvider';
import './Planet.css';

class PlanetDetail extends Component {


 
  constructor(props) {
    super(props);

    this.state = {
      isLogout: false,
      planetURL: '',
      planetDetail: {},
      isLoading: true
    };

  }


  componentDidMount(){

    let planetURL = this.props.location.state.planetURL;

    printLogMessages(planetURL);
    planetURL = planetURL.endsWith('/') ? planetURL.slice(0, -1) : planetURL;
    let planetId = planetURL.substring(planetURL.lastIndexOf("/") + 1, planetURL.length);

    this.getPlanetDetailsFromServer(planetId);

  }

/**
 * @desc function getPlanetDetailsFromServer gets one planet detail from server.
 * @param {*} planetId 
 */
  getPlanetDetailsFromServer(planetId){

    printLogMessages("planetURL " + planetId);


   makeGETRequest('planets/' + planetId, 
   
     (response) => {

            this.setState({isLoading: false});
            let planetDetailObject = response.data; 
            this.setState({planetDetail: planetDetailObject});
            printLogMessages(JSON.stringify(planetDetailObject));


        
    },
    (error) => {
        alert("No data available for this planet.");
    }
);

  }

/**
 * navigate user back to Login page
 */
  _displayLoginPage(){

    this.setState({isLogout: true});

  }

  

  render() {

    
    if (this.state.isLogout) {
      return <Redirect to='/login' />
    }

    if (this.state.isLoading) return null;

    return (
    <div className="container">
      <Navbar color="light" light expand="md">
      <Button outline size="sm" color="danger" className="ml-auto" onClick={() => this._displayLoginPage()}>
      Logout
      </Button>

        </Navbar>
        <div className="searchPage">
            <div>

            <div className="cardWrapper">

                <Card outline color="success">
                <CardHeader>{ this.state.planetDetail.name }</CardHeader>
                <CardBody>
                <CardTitle>Population: { this.state.planetDetail.population }</CardTitle>
                <CardSubtitle className="cardSubTitle">Diameter: { this.state.planetDetail.diameter }</CardSubtitle>
                <CardSubtitle className="cardSubTitle">Gravity: { this.state.planetDetail.gravity }</CardSubtitle>
                <CardSubtitle className="cardSubTitle">Climate: { this.state.planetDetail.climate }</CardSubtitle>
                <CardSubtitle className="cardSubTitle">Terrain: { this.state.planetDetail.terrain }</CardSubtitle>
                <CardSubtitle className="cardSubTitle">Orbital Period: { this.state.planetDetail.orbital_period }</CardSubtitle>
                <CardSubtitle className="cardSubTitle">Edited on: { this.state.planetDetail.edited }</CardSubtitle>
                
                </CardBody>
                <CardFooter className="text-muted"></CardFooter>
                </Card>
        
            </div>


      </div>
        </div>
    </div>
    );

  }
}

export default PlanetDetail;