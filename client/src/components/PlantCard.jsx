import React from "react";

import { Card, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

import "./PlantCard.css"

function PlantCard({name, img, phase, petSafe, careInstructions, plantId, userId, currentUser}) {

    let navigate = useNavigate();

    const goToUser = () => {
        let path = `/profile/${userId}`
        navigate(path);
    }

    const startTrade = () => {
        let path = `/`
    }

    const editPlant = () => {
        let path = `/plant/${plantId}`
        navigate(path);
    }

    if (currentUser === userId) {
        return (
            <div>
                 <Card 
                    style={{ width: '300px' }}
                    className="card border-success m-2"
                    >
                    <Card.Body
                        className="card-body text-success"
                    >
                        <Card.Title>{name}</Card.Title>
                        <Card.Img 
                            variant="top"
                            src={img}
                            id="PlantImage"
                        />
                        <Card.Text className="mt-2">
                            Care instructions: {careInstructions}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup 
                        className="list-group-flush"
                    >
                        <ListGroupItem>
                            <Badge 
                                bg="success"
                                id="Badge"
                            >
                                Phase of growth:
                            </Badge> 
                            {phase}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Badge
                                bg="success"
                                id="Badge"
                            >
                            Pet safe?
                            </Badge>
                            {petSafe}
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Footer>
                        <Button 
                            variant="outline-success"
                            onClick={editPlant}
                            className="me-5"
                        >
                            Edit Plant
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <Card 
                style={{ width: '300px' }}
                className="card border-success m-2"
            >
                <Card.Body
                    className="card-body text-success"
                >
                    <Card.Title>{name}</Card.Title>
                    <Card.Img 
                        variant="top"
                        src={img}
                        id="PlantImage"
                    />
                    <Card.Text className="mt-2">
                        Care instructions: {careInstructions}
                    </Card.Text>
                </Card.Body>
                <ListGroup 
                    className="list-group-flush"
                >
                    <ListGroupItem>
                        <Badge 
                            bg="success"
                            id="Badge"
                        >
                            Phase of growth:
                        </Badge> 
                        {phase}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Badge
                            bg="success"
                            id="Badge"
                        >
                        Pet safe?
                        </Badge>
                        {petSafe}
                    </ListGroupItem>
                </ListGroup>
                <Card.Footer>
                    <Button 
                        variant="outline-success"
                        onClick={startTrade}
                        className="me-5"
                    >
                        Offer trade
                    </Button>
                    <Button 
                        variant="success" 
                        onClick={goToUser}
                        className="me-auto"
                    >
                        About User
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default PlantCard