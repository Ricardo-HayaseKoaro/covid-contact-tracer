import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './core/Dashboard.js';

import  { Provider } from 'react-redux';
import store from '../store';

import { get_locations } from '../actions/locations'

store.dispatch(get_locations())

class App extends Component{
    render(){
        return (
        <Provider store = {store}>
            <Dashboard/>
        </Provider>
        )
    }
}

ReactDOM.render(<App/> , document.getElementById('app'))