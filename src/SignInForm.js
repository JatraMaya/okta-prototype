import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useOktaAuth} from '@okta/okta-react';

const SignInForm = () => {
    const {oktaAuth} = useOktaAuth();
    const [sessionToken, setSessionToken] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory()

    const cancelLogin = () => history.push("/")
    const handleSubmit = (e) => {
        e.preventDefault();

        oktaAuth.signInWithCredentials({username, password}).then(res => {
            const sessionToken = res.sessionToken;
            setSessionToken(sessionToken);
            // sessionToken is a one-use token, so make sure this is only called once
            oktaAuth.signInWithRedirect({sessionToken});
        }).catch(err => console.log('Found an error', err));
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    if (sessionToken) { // Hide form while sessionToken is converted into id/access tokens
        return null;
    }

    return (
        <div class="container mx-auto d-flex justify-content-center mt-5">
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">
                        Username:
                        <input class="form-control" id="username" type="text"
                            value={username}
                            onChange={handleUsernameChange}/>
                    </label>
                </div>
                <div class="mb-3">
                    <label class="form-label">
                        Password:
                        <input class="form-control" id="password" type="password"
                            value={password}
                            onChange={handlePasswordChange}/>
                    </label>
                </div>
                <div class="d-flex justify-content-evenly">
                    <input id="submit" type="submit" value="Login" class="btn btn-primary"/>
                    <input id="submit" type="submit" value="cancel" class="btn btn-primary"
                        onClick={cancelLogin}/>
                </div>
            </form>
        </div>
    );
};
export default SignInForm;
