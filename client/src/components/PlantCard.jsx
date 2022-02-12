import { React, useEffect, useState } from "react";

import { Card, ListGroup, ListGroupItem, Badge, Button, Alert } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

import TradeModal from "./TradeModal"

import "./PlantCard.css"

function PlantCard({name, img, phase, petSafe, careInstructions, plantId, userId, currentUser, filteredUserPlants, trading, plant, tradeForPlant}) {

    const [tradeModal, setTradeModal] = useState(false);
    const [tradePlant, setTradePlant] = useState(null);
    const [tradePlantListing, setTradePlantListing] = useState(null);
    const [tradeDetails, setTradeDetails] = useState({});
    const [showAlert, setShowAlert] = useState(false)

    const navigate = useNavigate()
    
    const goToUser = () => {
        navigate(`/profile/${userId}`)
    }

    const startTrade = () => {
        setTradePlant(plant)
        setTradeModal(true);
    }

    const hideTrade = () => {
        setTradeModal(false)
    }

    const handleClick = () => {
        setTradeDetails({
            ...tradeDetails,
            plant_offered_id: `${plant.id}`,
            offer_from_id: `${plant.user_id}`,
            plant_wanted_id: `${tradeForPlant.id}`,
            offer_to_id: `${tradeForPlant.user_id}`,
            trade_listing_id: `${tradePlantListing.plant_id}`
        });
        createNewTradeOffer();
    }

    useEffect(() => {
        if(tradeForPlant) {
            fetch(`/api/plant-listing/${tradeForPlant.id}`)
            .then((res) => res.json())
            .then((listing) => setTradePlantListing(listing))
        }
    }, [tradeForPlant])

    const createNewTradeOffer = () => {
        const offerParams = { ...tradeDetails }

        fetch("/api/trade_offers", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(offerParams),
        }).then((res) => {
            if (res.ok) {
                res.json()
                .then(setShowAlert(true))
            } else {
                res.json().then((errors) => {
                    console.error(errors);
                })
            }
        })
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
                            className="me-5"
                        >
                            Edit Plant
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        )
    } else if (trading===true) {
        return (
            <div>
                 <Card 
                    style={{ width: '300px' }}
                    className="card border-success m-2"
                    >
                    <Alert show={showAlert} variant="success">
                        <Alert.Heading>Trade request submitted</Alert.Heading>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShowAlert(false)} variant="outline-success">
                                Close
                            </Button>
                        </div>
                    </Alert>
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
                            className="me-5"
                            onClick={handleClick}
                        >
                            Trade me!
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
                        className="me-5"
                        onClick={startTrade}
                    >
                        Offer trade
                    </Button>
                    <TradeModal
                        show={tradeModal}
                        setModalShow={startTrade}
                        onHide={hideTrade}
                        tradePlant={tradePlant}
                        currentUser={currentUser}
                        filteredUserPlants={filteredUserPlants}
                    />
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