import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './layout/Dashboard.js';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import  { Provider } from 'react-redux';
import store from '../store';

import { getLocations} from '../actions/locations'

store.dispatch(getLocations())

//AlertOptions
const AlertOptions = {
    timeout: 3000,
    postion: 'top center'
}

class App extends Component{
    render(){
        return (
        <Provider store = {store}>
            <AlertProvider template={AlertTemplate}
            {...AlertOptions}>
                <Dashboard/>
            </AlertProvider>
        </Provider>
        )
    }
}

ReactDOM.render(<App/> , document.getElementById('app'))