import React from 'react';
import { ReactDOM, render } from 'react-dom';

import './index.css';

import App from './App';
// import Header from './components/Header';
// import HomePage from './components/HomePage';
// import UserProfile from './components/UserProfile';
// import EditProfile from './components/EditProfile';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root")

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
