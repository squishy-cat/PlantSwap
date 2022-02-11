import './App.css';

import {React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'
import EditProfile from './components/EditProfile'

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const [allPlants, setAllPlants] = useState([]);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setLoaded(true)
        });
      }
    });
  }, []);

  const getAllPlants = () => {
    fetch("/api/plants")
    .then((res) => res.json())
    .then((plants) => setAllPlants(plants))
  }

  useEffect(getAllPlants, []);

  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"})
    .then(res => {
          if (res.ok) {
            setCurrentUser(null)
          }
        })
  }

  return (
    <Router>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout} getPlants={getAllPlants} />
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} allPlants={allPlants} />} />
        <Route path="profile">
          {/* <Route path="me" element={<UserProfile currentUser={currentUser} />} /> */}
          <Route path=":userId" element={<UserProfile currentUser={currentUser} loaded={loaded} />} />
          <Route path="edit" element ={<EditProfile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
