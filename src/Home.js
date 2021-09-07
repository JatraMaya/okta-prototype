import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';

const Home = () => {
    const {authState, oktaAuth} = useOktaAuth();
    const history = useHistory();

    if (!authState) {
        return <div>Loading...</div>;
    }

    const button = authState.isAuthenticated ? <button class="btn btn-primary"
        onClick={
            () => {
                oktaAuth.signOut()
            }
    }>Logout</button> : <button class="btn btn-primary"
        onClick={
            () => {
                history.push('/login')
            }
    }>Login</button>;

    return (
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container">
                    <Link class="navbar-brand" to='/'>Home</Link>
                    <div class="navbar">
                        <div class="nav-item">
                            <Link class="nav-link" to='/protected'>Protected Route</Link>
                        </div>
                        {button} </div>
                </div>
            </nav>
            <div class="container">
                <p>This is Home</p>
            </div>
        </div>
    );
};
export default Home;
