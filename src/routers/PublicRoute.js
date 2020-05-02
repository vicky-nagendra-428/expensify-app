import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


export const PublicRoute = (
    {
        isAuthenticated,
        component: Component,
        ...rest
    }
    // props
) => (
    <Route {...rest} component={(props) => (
        isAuthenticated
        ? <Redirect to="/dashboard"/>
        : <Component {...props}/>
    )}/>
);

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid
    }
}

export default connect(mapStateToProps)(PublicRoute);