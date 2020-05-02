import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = (
{
    isAuthenticated,
    component: Component,
    ...rest //sending all the rest of the props
}
) => (
    <Route {...rest} component={(props) => (
        isAuthenticated
        ? (
            <div>
                <Header />
                <Component {...props}/>
            </div>
        ) 
        : <Redirect to="/"/>
    )}></Route>
);

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid
    }
}

export default connect(mapStateToProps)(PrivateRoute);