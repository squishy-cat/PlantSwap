import { React, useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import "./UserProfile.css"

import { Figure, Badge, Button } from "react-bootstrap"

function UserProfile( {currentUser, loaded} ) {
    const [user, setUser] = useState(null)

    let params = useParams();
    let searchId;

    if(loaded===true && params.userId==="me") {
        searchId = currentUser.id
        console.log(searchId)
        } else if (loaded===true && params.userId!=="me") {
        searchId = params.userId
        console.log(searchId)
    }

    useEffect(() => {
        fetch(`/api/users/${searchId}`)
                .then((res) => res.json())
                .then((user) => setUser(user))
    },[loaded]);

    if (!currentUser && loaded===false) {
        return (
            <div>Loading</div>
        )
    } else if (currentUser.id !== searchId) {
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
                href="/trade"
            >
                Start a trade!
            </Button>
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
                href="/profile/edit"
            >
                Edit my profile
            </Button>
        <Outlet />
        </div>
    )
}

export default UserProfile;