import React from "react";
import PlantCard from "./PlantCard";

function ViewPlants() {
    //fetch data based on params -- user's own plants, plants for trade, etc

    return (
        <div>
            <ul>
                <PlantCard />
            </ul>
        </div>
    )

}

export default ViewPlants;