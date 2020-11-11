import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './core/Dashboard.js'

import Header from './layout/Header';

class App extends Component{
    render(){
        return (
         <Dashboard/>
        )
    }
}

ReactDOM.render(<App/> , document.getElementById('app'))