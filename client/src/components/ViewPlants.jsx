import React from "react";

import CardGroup from 'react-bootstrap/CardGroup'

import PlantCard from "./PlantCard";

function ViewPlants({allPlants}) {
    //fetch data based on params -- user's own plants, plants for trade, etc
    if (allPlants.length === 0) {
        return (
            <div>No plants here!</div>
        )
    }

    return ( 
        <CardGroup
            className="card-deck"
        >
            {allPlants.map((plant) => {
                return (
                    <PlantCard
                        name={plant.common_name}
                        key={plant.id}
                        img={plant.picture}
                        phase={plant.phase}
                        petSafe={plant.pet_safe}
                        careInstructions={plant.care_instructions}
                    />
                )
            })}
        </CardGroup>
    )
}

export default ViewPlants;