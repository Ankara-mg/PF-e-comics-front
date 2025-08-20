// import React, { useEffect } from 'react'
// import GoogleLogin from 'react-google-login';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
// import { gapi } from 'gapi-script';
import './Login.css'
export default function LoginAuth({ login }) {

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const backendURL = import.meta.env.VITE_API;

  const responsegoogle = async (res) => {
    const response = await axios.post(`${backendURL}/login/auth/google`, {
      google: res.credential
    })
   
    localStorage.setItem('token', JSON.stringify(response.data.token))
    localStorage.setItem("user", JSON.stringify(response.data.name))
    localStorage.setItem("ROL", JSON.stringify(response.data.Rol))
    localStorage.setItem("id", JSON.stringify(response.data.id))
    localStorage.setItem("email", JSON.stringify(response.data.email))

    login()
  }
  return (
    <div>
      <div>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={responsegoogle}
            onError={() => console.log('Login Failed')}
          />
        </GoogleOAuthProvider>
      </div>


    </div>
  )
}
