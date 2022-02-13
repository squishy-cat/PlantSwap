import './App.css';

import {React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'
import EditProfile from './components/EditProfile'
import ViewTrades from './components/ViewTrades';

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

  const getPlants = () => {
    fetch("/api/plants")
    .then((res) => res.json())
    .then((plants) => setAllPlants(plants))
  }

  useEffect(getPlants, []);

  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"})
    .then(res => {
          if (res.ok) {
            setCurrentUser(null)
          }
        })
  }

  const filterUserPlants = (userId) => {
    return allPlants.filter(plant => plant.user_id==userId)
  }
  
  const filterListedPlants = () => {
    return allPlants.filter(plant => plant.listed===true)
  }

  const filterListedPlantsForUser = (userId) => {
    return allPlants.filter(plant => plant.user_id==userId && plant.listed===true)
  }

  return (
    <Router>
      <Header 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        handleLogout={handleLogout} 
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              currentUser={currentUser} 
              allPlants={allPlants} 
              filterUserPlants={filterUserPlants} 
              filterListedPlants={filterListedPlants} 
              loaded={loaded}
            />
          } 
        />
        <Route 
          path="profile"
        >
          <Route 
            path=":userId" 
            element={
              <UserProfile 
                currentUser={currentUser} 
                loaded={loaded} 
                filterUserPlants={filterUserPlants} 
                filterListedPlantsForUser={filterListedPlantsForUser}
              />
            } 
          />
          <Route 
            path="edit" 
            element ={
              <EditProfile 
                currentUser={currentUser}
              />
            } 
          />
        </Route>
        <Route 
          path="trades/:userId"
          element={
            <ViewTrades 
              currentUser={currentUser}
              allPlants={allPlants}
            />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App;
