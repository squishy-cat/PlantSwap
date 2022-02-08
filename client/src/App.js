import './App.css';
import Header from './components/Header';
// import HomePage from './components/HomePage';
// import ViewTrades from './components/ViewTrades';
// import { Router } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ViewPlants from './components/ViewPlants';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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
      <ViewPlants />
    </div>
    );
  }

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
