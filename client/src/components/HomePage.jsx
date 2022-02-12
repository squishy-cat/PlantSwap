import { React } from "react";
import "./HomePage.css"

import ViewPlants from './ViewPlants';

function HomePage( {currentUser, filterListedPlants, filterUserPlants} ) {

// render if user is logged out

  if (!currentUser) {
    return (
    <div>
        <h2>Listed Plants</h2>
        <ViewPlants 
          allPlants={filterListedPlants()}
        />
    </div>
    );
  }

  // render if user is logged in
  console.log(filterListedPlants())

  return (
    <div className="HomePage">
        <h2>Listed Plants</h2>
        <ViewPlants 
          allPlants={filterListedPlants()}
          filteredUserPlants={filterUserPlants(currentUser.id)}
        />
        <br />
        <h2>My Plants</h2>
        <ViewPlants 
          allPlants={filterUserPlants(currentUser.id)}
          currentUser={currentUser.id}
        />
    </div>
  );
}

export default HomePage;