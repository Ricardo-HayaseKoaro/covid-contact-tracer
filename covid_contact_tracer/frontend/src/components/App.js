import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './locations/Home';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Alerts from './layout/Alerts';
import PrivateRoute from './common/PrivateRoute';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Provider } from 'react-redux';
import store from '../store';

import { loadUser } from '../actions/auth';
import { getNotifications } from '../actions/notifications';

//AlertOptions
const AlertOptions = {
    timeout: 3000,
    postion: 'top center'
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
        store.dispatch(getNotifications());
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate}
                    {...AlertOptions}>
                    <Router>
                        <Alerts />
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                        </Switch>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))