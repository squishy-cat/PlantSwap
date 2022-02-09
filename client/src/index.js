import React from 'react';
import { render } from 'react-dom';
import { 
  BrowserRouter, Route, Routes
} from "react-router-dom"

import './index.css';

import App from './App';
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'
import EditProfile from './components/EditProfile'

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';



render(
  <BrowserRouter>
    <Routes> 
      <Route path="/" element = {<App />}>
        <Route index element = {<HomePage />} />
        <Route path="profile" element = {<UserProfile />}>
          <Route path="edit" element = {<EditProfile />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
