import { React } from "react";
import './ViewPlants.css';

import { CardGroup } from 'react-bootstrap'

import PlantCard from "./PlantCard";

function ViewPlants({allPlants, currentUser, filteredUserPlants, trading, tradePlant}) {
    
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
                            plantId={plant.id}
                            userId={plant.user_id}
                            currentUser={currentUser}
                            filteredUserPlants={filteredUserPlants}
                            trading={trading}
                            tradeForPlant={tradePlant}
                        />
                    )
                })}
            </CardGroup>
        </div>
    )
}

export default ViewPlants;