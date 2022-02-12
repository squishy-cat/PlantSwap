import { React } from "react";
import './ViewPlants.css';

import { CardGroup } from 'react-bootstrap'

import PlantCard from "./PlantCard";

function ViewPlants({allPlants, currentUser, filteredUserPlants, trading, tradePlant}) {
    //fetch data based on params -- user's own plants, plants for trade, etc
    // if (allPlants.length === 0) {
    //     return (
    //         <div>No plants here!
    //             <Button
    //                 variant="success"
    //                 style={{maxHeight:'50px'}}
    //                 id="button"
    //             >
    //                 Add plants
    //             </Button>
    //         </div> 
            
    //     )
    // }

    return ( 
        <div>
            <CardGroup
                className="card-deck"
            >
                {allPlants.map((plant) => {
                    return (
                        <PlantCard
                            plant={plant}
                            name={plant.common_name}
                            key={plant.id}
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