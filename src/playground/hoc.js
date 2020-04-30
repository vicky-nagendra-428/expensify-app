import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>This is Info</h1>
        <p>hey, here is the description : {props.info}</p>
    </div>
);

const AdminInfo = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is in Admin Info</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const AuthInfo = (WrappedComponent) => {
    return (props) => (
        <div>
            <p>{props.isAuthenticated ? 'Authenticated' : 'Please login'}</p>
            <WrappedComponent {...props}/>
        </div>
    );
}

const AdminInfoComponent = AdminInfo(Info);
const AuthInfoComponent = AuthInfo(Info);

// ReactDOM.render(<AdminInfoComponent isAdmin={false} info="mango"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfoComponent isAuthenticated={false} info="mango"/>, document.getElementById('app'));