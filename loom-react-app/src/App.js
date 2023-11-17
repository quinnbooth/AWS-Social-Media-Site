import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import Home from './components/Home';
import SignInBackground from './components/SignInBackground';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {

  const [login, setLogin] = useState(false);

  const handleLogin = () => { setLogin(true); };
  const handleLogout = () => { setLogin(false); };

  return (
    <div className='App'>
      {!login && <SignInBackground />}
      <div className='AuthenticatorContainer'>
        {!login && <h1>LOOM</h1>}
        <Authenticator>
          {({ signOut, user }) => (
            <Home user={user.username} signOut={signOut} login={handleLogin} logout={handleLogout} />
          )}
        </Authenticator>
      </div>
    </div>
  );
}

export default App;
