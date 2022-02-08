import './App.css';
import Header from './components/Header';
// import HomePage from './components/HomePage';
// import ViewTrades from './components/ViewTrades';
import LoginForm from './components/LoginForm'
// import { Router } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button'

import ViewPlants from './components/ViewPlants';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        });
      }
    });
  }, []);

  if (!isAuthenticated) {
    return (
    <div>
      <Header 
        show={modalShow}
        onClickFunction={() => setModalShow(true)}
        onHideFunction={() => setModalShow(false)}

        currentUser = {currentUser}
        authed = {isAuthenticated}
      />
      <div>
        <ViewPlants />
      </div>
    </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Please log in!
        </Button>
        <LoginForm
          show={modalShow}
          onHide={() => setModalShow(false)}

          currentUser = {currentUser}
          setCurrentUser = {setCurrentUser}
        >
        </LoginForm>
      </div>
      <div>
        <ViewPlants />
      </div>
    </div>
  );
}

export default App;
