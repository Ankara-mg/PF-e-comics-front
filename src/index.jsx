import './index.css';
import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode >
    <AuthContextProvider>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Elements>
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
