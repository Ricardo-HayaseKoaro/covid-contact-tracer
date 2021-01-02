import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';
import Dashboard from '../layout/Dashboard';
import { AttachMoneySharp } from '@material-ui/icons';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading === false) {
        if (auth.isAuthenticated) {
          return (
            <Dashboard>
              <Component {...props} />
            </Dashboard>
          );
        } else {
          return <Redirect to="/login" />;
        }
      } else {
        return <Loading />;
      }
    }}
/>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);

