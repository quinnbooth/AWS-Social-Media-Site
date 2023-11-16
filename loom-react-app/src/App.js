import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import SignInBackground from './components/SignInBackground';
Amplify.configure(awsExports);

function App() {
  return (
    <div className='App'>
      <SignInBackground />
      <div className='AuthenticatorContainer'>
        <h1>LOOM</h1>
        <Authenticator>
          {({ signOut, user }) => (
            <main>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
        </Authenticator>
      </div>
    </div>
  );
}

export default App;
