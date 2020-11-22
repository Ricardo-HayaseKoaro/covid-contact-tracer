import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../layout/Dashboard';
import Login from '../accounts/Login';
import Register from '../accounts/Register';
import Alerts from '../layout/Alerts';
import UploadFile from '../locations/UploadLocations';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';

//Redux mapping
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

function Routing(props){
    let isAuth = props.isAuthenticated;

    return (
        <Router>
            <div>
            <Alerts/>
                <Switch>
                    <PrivateRoute exact path="/">
                        <Dashboard/>
                    </PrivateRoute>
                    <Route exact path="/login">
                        {isAuth ? <Redirect to="/" /> : <Login />} 
                    </Route>
                    <Route exact path="/register">
                        <Register/>
                    </Route>
                    <PrivateRoute exact path="/upload">
                        <UploadFile/>
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    )
}

export default connect(mapStateToProps)(Routing);