import { React, useEffect, useState } from "react";

import { Card, ListGroup, ListGroupItem, Badge, Button, Alert } from 'react-bootstrap';

import TradeModal from "./TradeModal"
import EditPlant from "./EditPlant";

import "./PlantCard.css"

function PlantCard({name, img, phase, petSafe, careInstructions, userId, currentUser, filteredUserPlants, trading, listed, plant, tradeForPlant, getPlants, filterListedPlantsForUser, profileUserId}) {

    const [tradeModal, setTradeModal] = useState(false);
    const [activePlant, setActivePlant] = useState(null);
    const [tradePlantListing, setTradePlantListing] = useState(null);
    const [tradeDetails, setTradeDetails] = useState({});
    const [showAlert, setShowAlert] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    
    const goToUser = (e) => {
        e.preventDefault();
        window.location.href=`/profile/${userId}`
    }

    const startTrade = () => {
        setActivePlant(plant)
        setTradeModal(true);
    }
    
    const hideTrade = () => {
        setActivePlant(null)
        setTradeModal(false)
    }

    const startEdit = () => {
        setActivePlant(plant)
        setShowEdit(true)
    }

    const hideEdit = () => {
        setActivePlant(null)
        setShowEdit(false)
    }


    const handleClick = () => {
        setTradeDetails({
            ...tradeDetails,
            plant_offered_id: `${plant.id}`,
            offer_from_id: `${plant.user_id}`,
            plant_wanted_id: `${tradeForPlant.id}`,
            offer_to_id: `${tradeForPlant.user_id}`,
            trade_listing_id: `${tradePlantListing.id}`
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

    if (trading===true) {
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
   
    } else if (currentUser===userId) {
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
                        <ListGroupItem>
                            {listed ? 
                                <Badge bg="success" id="Badge">I am listed for trade</Badge> 
                            : 
                                <Badge bg="warning" id="Badge">I am not available for trade</Badge>}
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Footer>
                        <Button 
                            variant="outline-success"
                            className="me-5"
                            onClick={startEdit}
                        >
                            Edit Plant
                        </Button>
                        <EditPlant 
                            show={showEdit}
                            onHide={hideEdit}
                            editPlant={activePlant}
                            getPlants={getPlants}
                            currentUser={currentUser}
                        />
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
                {currentUser 
                ? 
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
                        onHide={hideTrade}
                        tradePlant={activePlant}
                        allPlants={filteredUserPlants}
                        filteredUserPlants={filteredUserPlants}
                        currentUser={currentUser}
                        filterListedPlantsForUser={filterListedPlantsForUser}

                    />
                    {userId !== profileUserId ? 
                        <Button 
                            variant="success" 
                            onClick={goToUser}
                            className="me-auto"
                        >
                            About User
                        </Button>
                    : null}
                </Card.Footer>                    
                :                     
                <Card.Footer>
                    <Badge
                        bg="warning"
                        id="Badge"
                    >
                        Log in to trade!
                    </Badge>
                </Card.Footer>
                }
            </Card>
        </div>
    )
}

export default PlantCard