import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Logins() {


    const login = useGoogleLogin({
      onSuccess: tokenResponse => console.log(tokenResponse),
    });
    return(
<button onClick={() => login()}>Sign in with Google 🚀 </button>    
)
    }

export default Logins ; 