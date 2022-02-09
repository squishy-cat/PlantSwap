import React from "react";
import PlantCard from "./PlantCard";

function ViewPlants({allPlants, loaded}) {
    //fetch data based on params -- user's own plants, plants for trade, etc
    if (loaded) {
        return ( 
            <div>
                {allPlants.map((plant) => {
                    console.log(plant.common_name)
                    return (
                        <PlantCard
                            name={plant.common_name}
                            key={plant.id}
                            img={plant.picture}
                            phase={plant.phase}
                            petSafe={plant.pet_safe}
                        />
                    )
                })}
            </div>
        )
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
}

export default ViewPlants;