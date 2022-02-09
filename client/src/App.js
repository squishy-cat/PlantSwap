import './App.css';
import Header from './components/Header';
import ViewPlants from './components/ViewPlants';

// import HomePage from './components/HomePage';
// import ViewTrades from './components/ViewTrades';
// import { Router } from 'react-router-dom';
import { useState, useEffect } from 'react';

import background from './assets/footer-plants.jpg';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [allPlants, setAllPlants] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
        });
      }
    });
  }, []);

  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"})
    .then(res => {
          if (res.ok) {
            setCurrentUser(null)
          }
        })
  }

  const onClickFunction = () => {
    setModalShow(true)
  }

  const onHideFunction = () => {
    setModalShow(false)
  }

// fetch all plants

  const getAllPlants = () => {
    fetch("/api/plants")
    .then((res) => res.json())
    // .then(setTimeout(() => {setLoaded(true); }, 2000))
    .then((plants) => setAllPlants(plants))
    .then(setLoaded(true))
  }

  useEffect(getAllPlants, []);

// render if user is logged out

  if (!currentUser) {
    return (
    <div>
      <Header 
        show={modalShow}
        onClickFunction={onClickFunction}
        onHideFunction={onHideFunction}
        setModalShow={setModalShow}

        currentUser = {currentUser}
        setCurrentUser = {setCurrentUser}
      />
      <ViewPlants 
        allPlants={allPlants}
        loaded={loaded}
      />
    </div>
    );
  }

  // render if user is logged in

  return (
    <div>
      <Header
        handleLogout = {handleLogout}
      />
      <ViewPlants />
    </div>
  );
}

export default App;
