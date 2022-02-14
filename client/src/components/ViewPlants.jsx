import { React } from "react";
import './ViewPlants.css';

import { CardGroup } from 'react-bootstrap'

import PlantCard from "./PlantCard";

function ViewPlants({allPlants, currentUser, filteredUserPlants, trading, tradePlant, getPlants, filterListedPlantsForUser, profileUserId}) {
    
    return ( 
        <div>
            <CardGroup
                className="card-deck"
            >
                {allPlants.map((plant) => {
                    return (
                        <PlantCard
                            key={plant.id}
                            plant={plant}
                            name={plant.common_name}
                            img={plant.picture}
                            phase={plant.phase}
                            petSafe={plant.pet_safe}
                            careInstructions={plant.care_instructions}
                            listed={plant.listed}
                            plantId={plant.id}
                            userId={plant.user_id}
                            profileUserId={profileUserId}
                            currentUser={currentUser}
                            filterListedPlantsForUser={filterListedPlantsForUser}
                            filteredUserPlants={filteredUserPlants}
                            trading={trading}
                            tradeForPlant={tradePlant}
                            getPlants={getPlants}
                        />
                    )
                })}
            </CardGroup>
        </div>
    )
}

export default ViewPlants;