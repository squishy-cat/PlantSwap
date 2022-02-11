import React from "react";
import "./HomePage.css"

import ViewPlants from './ViewPlants';

function HomePage( {currentUser, allPlants} ) {

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
        <h2>Listed Plants</h2>
        <ViewPlants 
          allPlants={renderListedPlants()}
        />
    </div>
    );
  }

  // render if user is logged in

  return (
    <div className="HomePage">
        <h2>Listed Plants</h2>
        <ViewPlants 
          allPlants={renderListedPlants()}
        />
        <br />
        <h2>My Plants</h2>
        <ViewPlants 
          allPlants={getUserPlants()}
          currentUser={currentUser.id}
        />
    </div>
  );
}

export default HomePage;