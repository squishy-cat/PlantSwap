import './App.css';
import Header from './components/Header';
import ViewPlants from './components/ViewPlants';

import { useState, useEffect } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [allPlants, setAllPlants] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [newPlantModal, setNewPlantModal] = useState(false);

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

  const showNewPlant = () => {
    setNewPlantModal(true)
  }

  const hideNewPlant = () => {
    setNewPlantModal(false)
  }

// fetch all plants

  const getAllPlants = () => {
    fetch("/api/plants")
    .then((res) => res.json())
    .then((plants) => setAllPlants(plants))
    .then(setLoaded(true))
  }

  useEffect(getAllPlants, []);

// fetch user's own plants

const getUserPlants = () => {
  return allPlants.filter(plant => plant.user_id===currentUser.id)
}

const renderListedPlants = () => {
  return allPlants.filter(plant => plant.listed===true)
}

// render if user is logged out

  if (!currentUser) {
    return (
    <div>
        <Header 
          show={modalShow}
          onClickFunction={onClickFunction}
          onHideFunction={onHideFunction}
          setModalShow={setModalShow}

          setCurrentUser = {setCurrentUser}
          currentUser = {currentUser}

          newPlant={newPlantModal}
          setNewPlant={setNewPlantModal}
          showNewPlant={showNewPlant}
          hideNewPlant={hideNewPlant}
        />
        <h2>Listed Plants</h2>
        <ViewPlants 
          allPlants={renderListedPlants()}
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

          newPlant={newPlantModal}
          setNewPlant={setNewPlantModal}
          showNewPlant={showNewPlant}
          hideNewPlant={hideNewPlant}

          currentUser = {currentUser}
          getPlants = {getAllPlants}        
        />
        <h2>Listed Plants</h2>
        <ViewPlants 
          allPlants={renderListedPlants()}
        />
        <br />
        <h2>My Plants</h2>
        <ViewPlants 
          allPlants={getUserPlants()}
        />
    </div>
  );
}

export default App;
