import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { setupStore } from '../';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAmoW1l1198_HyWGFg-jdyeLcZZyaQi9_Y",
  authDomain: "flight-book-5d2b2.firebaseapp.com",
  projectId: "flight-book-5d2b2",
  storageBucket: "flight-book-5d2b2.appspot.com",
  messagingSenderId: "301030231385",
  appId: "1:301030231385:web:111c9750b3203de7ae1048",
  measurementId: "G-57YPSG56JE"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export const Context = createContext<Record<string, any>>({});

// const store = setupStore();
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    {/* <Provider store={{}}> */}
      <BrowserRouter>
        <Context.Provider value={{
          firebase,
          auth,
          firestore
        }}>
          <App />
        </Context.Provider>
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
);
