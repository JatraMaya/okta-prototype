import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {Security, SecureRoute, LoginCallback} from '@okta/okta-react';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import Home from './Home';
import SignIn from './SignIn';
import Protected from './Protected';

const oktaDomain = process.env.REACT_APP_DOMAIN
const clientId = process.env.REACT_APP_CLIENT_ID

const AppWithRouterAccess = () => {
    const history = useHistory();
    const onAuthRequired = () => {
        history.push('/login');
    };

    const oktaAuth = new OktaAuth({
        issuer: `https://${oktaDomain}/oauth2/default`,
        clientId: clientId,
        redirectUri: window.location.origin + '/login/callback',
        onAuthRequired: onAuthRequired,
        pkce: true
    });

    const restoreOriginalUri = (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri, window.location.origin));
    };

    return (
        <Security oktaAuth={oktaAuth}
            restoreOriginalUri={restoreOriginalUri}>
            <Route path='/'
                exact={true}
                component={Home}/>
            <SecureRoute path='/protected'
                component={Protected}/>
            <Route path='/login'
                render={
                    () => <SignIn/>
                }/>
            <Route path='/login/callback'
                component={LoginCallback}/>
        </Security>
    );
};
export default AppWithRouterAccess;
