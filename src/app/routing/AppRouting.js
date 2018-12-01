// LIBRARY
import React from 'react';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';

// COMPONENT
import Login from '../Login/Login';
import HomePage from '../Home/HomePage';
import PlanetDetail from '../Planets/PlanetDetail';

/**
 * application routing configuration
 */
export default (
    <Router>

       <Switch>

       <Route component={Login} exact path='/' />
       <Route component={Login} exact path='/login' />       
        <Route exact component={HomePage} path='/home' />
        <Route exact component={PlanetDetail} path='/planetdetail' />
        
       </Switch>


    </Router>

);
