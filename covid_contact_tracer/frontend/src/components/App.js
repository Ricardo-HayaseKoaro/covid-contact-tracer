import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './locations/Home';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Account from './accounts/Account';
import Alerts from './layout/Alerts';
import PrivateRoute from './common/PrivateRoute';
import NotificationsList from './notifications/NotificationsList';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './layout/AlertTemplate';

import { Provider } from 'react-redux';
import store from '../store';

import { loadUser } from '../actions/auth';

//AlertOptions
const AlertOptions = {
    timeout: 3000,
    position: 'bottom left',
    containerStyle: {
        zIndex: 5000,
        margin: '5vh'
    },
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
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
                            <PrivateRoute exact path="/notifications" component={NotificationsList} />
                            <PrivateRoute exact path="/account" component={Account}/>
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