import { React, useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";

import "./UserProfile.css"

import { Figure, Badge, Button } from "react-bootstrap"

import ViewPlants from "./ViewPlants";

function UserProfile( {currentUser, loaded, filterUserPlants, filterListedPlantsForUser, getPlants} ) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    let params = useParams();
    let searchId;

    const handleClick = () => {
        navigate('/profile/edit')
    }

    useEffect(() => {
        if (params.userId==="me" && loaded===true) {
            searchId = currentUser.id
        }
        else if (params.userId!=="me" && loaded===true){
            searchId = params.userId
        }
        fetch(`/api/users/${searchId}`)
        .then((res) => res.json())
        .then((user) => setUser(user))
    },[loaded === true]);
    
    if (loaded===false) {
        return (
            <div>
                Loading...
            </div>
        )

    } else if (currentUser.id != user.id) {
        // setLoaded(true)
        return (
            <div className="UserProfile">
            <Figure>
                <Figure.Image
                    className="w-25 p-3"
                    id="UserImage"
                    src={user.photo}
                />
                <h2>About {user.name}</h2>
                <Badge 
                    bg="success"
                    id="Badge"
                >
                    My bio:
                </Badge> 
                <Badge
                    bg="light"
                    id="Badge"
                    style={{color:"darkgreen"}}
                >
                    {user.bio}
                </Badge>
                <br />
                <Badge 
                    bg="success"
                    id="Badge"
                >
                    My address:
                </Badge> 
                <Badge
                    bg="light"
                    id="Badge"
                    style={{color:"darkgreen"}}
                >
                    {user.address}
                </Badge>
                <br />
                <Badge 
                    bg="success"
                    id="Badge"
                >
                    My favorite plants:
                </Badge>
                <Badge
                    bg="light"
                    id="Badge"
                    style={{color:"darkgreen"}}
                >
                    {user.fav_plant}
                </Badge>
                <br />
                <Badge 
                    bg="success"
                    id="Badge"
                >
                    I'm interested in:
                </Badge>
                <Badge
                    bg="light"
                    id="Badge"
                    style={{color:"darkgreen"}}
                >
                    {user.interested_in}
                </Badge>
            </Figure>
            <br />
            <h2>{user.name}'s Listed Plants</h2>
            <ViewPlants 
                allPlants={filterListedPlantsForUser(user.id)}
                currentUser={currentUser.id}
                profileUserId={user.id}
                filterListedPlantsForUser={filterListedPlantsForUser}
            />
        <Outlet />
        </div>
        )
    } else if (currentUser.id==user.id)
    return (
        <div className="UserProfile">
            {/* {setLoaded(true)} */}
            <Figure>
                <Figure.Image
                    className="w-25 p-3"
                    id="UserImage"
                    src={user.photo}
                />
                <h2>{user.name}</h2>
                <Badge 
                    bg="success"
                    id="Badge"
                >
                    My bio:
                </Badge> 
                <Badge
                    bg="light"
                    id="Badge"
                    style={{color:"darkgreen"}}
                >
                    {user.bio}
                </Badge>
                <br />
                <Badge 
                    bg="success"
                    id="Badge"
                >
                    My address:
                </Badge> 
                <Badge
                    bg="light"
                    id="Badge"
                    style={{color:"darkgreen"}}
                >
                    {user.address}
                </Badge>
                <br />
                <Badge 
                    bg="success"
                    id="Badge"
                >
                    My favorite plants:
                </Badge>
                <Badge
                    bg="light"
                    id="Badge"
                    style={{color:"darkgreen"}}
                >
                    {user.fav_plant}
                </Badge>
                <br />
                <Badge 
                    bg="success"
                    id="Badge"
                >
                    I'm interested in:
                </Badge>
                <Badge
                    bg="light"
                    id="Badge"
                    style={{color:"darkgreen"}}
                >
                    {user.interested_in}
                </Badge>
            </Figure>
            <br />
            <Button
                variant="outline-success"
                onClick={handleClick}
            >
                Edit my profile
            </Button>
            <br />
            <br />
            <h2>My Plants</h2>
            <ViewPlants 
                allPlants={filterUserPlants(user.id)}
                currentUser={currentUser.id}
                getPlants={getPlants}
            />
        <Outlet />
        </div>
    )
}

export default UserProfile;