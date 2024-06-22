import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter} from "react-router-dom"; 
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='205117107598-f1khci392lb5cjsntqn8qhh3l3qrvkkp.apps.googleusercontent.com'>
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
  </GoogleOAuthProvider>
);


