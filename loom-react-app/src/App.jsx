import React, { useEffect, useState } from 'react';
import SignInBackground from './components/SignInBackground';
import Home from './components/Home';
import './App.css';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/api';

console.log("Configuring Amplify...");
Amplify.configure(awsExports)


function App() {

  const [login, setLogin] = useState(false);

  const handleLogin = () => { setLogin(true); };
  const handleLogout = () => { setLogin(false); };

  const [client, setClient] = useState(null);

  useEffect(() => {
      setClient(generateClient());
  }, []);

  return (
    <div className='App'>
      {!login && <SignInBackground />}
      <div className='AuthenticatorContainer'>
        {!login && <h1>LOOM</h1>}
        <Authenticator>
          {({ signOut, user }) => (
            <Home user={user.username} signOut={signOut} login={handleLogin} logout={handleLogout} client={client} />
          )}
        </Authenticator>
      </div>
    </div>
  );
}

export default App;
