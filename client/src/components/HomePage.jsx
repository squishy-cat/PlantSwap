import { React } from "react";
import "./HomePage.css"

import ViewPlants from './ViewPlants';

function HomePage( {currentUser, filterListedPlants, filterUserPlants, getPlants, filterListedPlantsForUser} ) {

// render if user is logged out

  if (!currentUser) {
    return (
    <div>
        <h2>Plants Listed for Trade</h2>
        <ViewPlants 
          allPlants={filterListedPlants()}
        />
    </div>
    );
  }

  // render if user is logged in

  return (
    <div className="HomePage">
        <h2>Plants Listed for Trade</h2>
        <ViewPlants 
          allPlants={filterListedPlants()}
          filteredUserPlants={filterUserPlants(currentUser.id)}
          getPlants={getPlants}
          currentUser={currentUser.id}
          filterListedPlantsForUser={filterListedPlantsForUser}
        />
        <br />
        <h2>My Plant Collection</h2>
        <ViewPlants 
          allPlants={filterUserPlants(currentUser.id)}
          currentUser={currentUser.id}
          getPlants={getPlants}
        />
    </div>
  );
}

export default HomePage;