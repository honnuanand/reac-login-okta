import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Private from './Private';
import { BrowserRouter, Route } from 'react-router-dom';

import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useHistory } from 'react-router-dom';


const oktaAuth = new OktaAuth({
  issuer: '{Issuer}',
  clientId: '{clientID}',
  redirectUri: 'http://localhost:3000/callback'
});

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
    return (
    <div className="App">
      <div className="page">
        <div className="content">
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <Header/>
          <Route path='/' exact={true} component={Home}/>
          <SecureRoute path='/private' exact={true} component={Private}/>
          <Route path='/callback' component={LoginCallback}/>
        </Security>
        </div>
      </div>
    </div>
  );
}

export default App;