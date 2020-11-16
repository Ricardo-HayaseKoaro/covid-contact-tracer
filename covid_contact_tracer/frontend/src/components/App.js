import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './layout/Dashboard';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Alerts from './layout/Alerts';
import PrivateRoute from './common/PrivateRoute';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import  { Provider } from 'react-redux';
import store from '../store';

import { getLocations} from '../actions/locations'
import { loadUser } from '../actions/auth';

// store.dispatch(getLocations())

//AlertOptions
const AlertOptions = {
    timeout: 3000,
    postion: 'top center'
}

class App extends Component{
    componentDidMount(){        
        store.dispatch(loadUser());
    }
    render(){
        return (
        <Provider store = {store}>
            <AlertProvider template={AlertTemplate}
            {...AlertOptions}>
                <Router>
                    <Alerts/>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                    </Switch>
                </Router>
            </AlertProvider>
        </Provider>
        )
    }
}

ReactDOM.render(<App/> , document.getElementById('app'))