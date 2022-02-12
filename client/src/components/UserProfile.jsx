import { React, useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";

import "./UserProfile.css"

import { Figure, Badge, Button } from "react-bootstrap"

import ViewPlants from "./ViewPlants";

function UserProfile( {currentUser, loaded, filterUserPlants} ) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/profile/edit')
    }

    let params = useParams();
    let searchId;

    if(loaded===true && params.userId==="me") {
        searchId = currentUser.id
        } else if (loaded===true && params.userId!=="me") {
        searchId = params.userId
    }

    useEffect(() => {
        fetch(`/api/users/${searchId}`)
        .then((res) => res.json())
        .then((user) => setUser(user))
    },[loaded]);


    if (!currentUser) {
        return (
            <div>Loading</div>
        )

    } else if (currentUser && currentUser.id != user.id) {
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
            <h2>{user.name}'s Plants</h2>
            <ViewPlants 
                allPlants={filterUserPlants(user.id)}
                currentUser={currentUser.id}
            />
        <Outlet />
        </div>
        )
    }

    return (
        <div className="UserProfile">
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
                // href="/profile/edit"
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
            />
        <Outlet />
        </div>
    )
}

export default UserProfile;