import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';
import Dashboard from '../layout/Dashboard';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Loading/>;
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return(
          <Dashboard>
            <Component {...props} />
          </Dashboard>
        );
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);

