import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Routing from './common/Routing';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import  { Provider } from 'react-redux';
import store from '../store';

import { loadUser } from '../actions/auth';
 
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
                <Routing/>
            </AlertProvider>
        </Provider>
        )
    }
}

ReactDOM.render(<App/> , document.getElementById('app'))