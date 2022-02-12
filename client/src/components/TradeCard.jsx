import { React, useState } from "react";

import { Card, Button, Badge } from "react-bootstrap"

import "./TradeCard.css"

function TradeCard( {plantOffered, plantWanted, userFrom, userTo, pending, tradeId} ) {

    const acceptOffer = () => {
        fetch(`../api/trade_offers/${tradeId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            }, 
            body: JSON.stringify({accepted: true}),
            })
            .then((res) => {
                if (res.ok) {
                    res.json()
                } else {
                    res.json().then((errors) => {
                        console.error(errors);
                    })
            }
        })
        fetch(`../api/plants/${plantOffered.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({user_id: `${userTo.id}`, listed: "false"}),
            })
            .then((res) => {
                if (res.ok) {
                    res.json()
                } else {
                    res.json().then((errors) => {
                        console.error(errors);
                    })
            }
        })
        fetch(`../api/plants/${plantWanted.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({user_id: `${userFrom.id}`, listed: "false"}),
            })
            .then((res) => {
                if (res.ok) {
                    res.json()
                } else {
                    res.json().then((errors) => {
                        console.error(errors);
                    })
            }
        })
    }

    if(pending==="user") {
        return (
            <div>
                <Card 
                    style={{ width: '300px' }}
                    className="card border-success m-2"
                >
                    <Card.Body
                        className="card-body text-success"
                    >
                        <Card.Title>I received an offer from {userFrom.name} for my {plantWanted.common_name}</Card.Title>
                        <Card.Img 
                            variant="top" 
                            id="PlantImage"
                            src={plantOffered.picture} 
                        />
                        <Card.Text
                            className="mt-2"
                        >
                            <Badge
                                bg="success"
                                id="Badge"
                            >
                                They are offering:
                            </Badge> {plantOffered.common_name}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Button
                            variant="outline-success"
                            className="me-4"
                            onClick={acceptOffer}
                        >
                            Accept Offer
                        </Button>
                        <Button
                            variant="warning"
                        >
                            Decline Offer
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    } else if (pending="acceptance") {
        return (
            <div>
                <Card 
                    style={{ width: '300px' }}
                    className="card border-success m-2"
                >
                    <Card.Body
                        className="card-body text-success"
                    >
                        <Card.Title>I sent an offer for {userTo.name}'s {plantWanted.common_name}</Card.Title>
                        <Card.Img 
                            variant="top" 
                            id="PlantImage"
                            src={plantWanted.picture} 
                        />
                        <Card.Text
                            className="mt-2"
                        >
                            <Badge
                                bg="success"
                                id="Badge"
                            >
                                My offered plant:
                            </Badge> {plantOffered.common_name}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Button
                            variant="outline-success"
                            className="me-5"
                        >
                            Edit Offer
                        </Button>
                        <Button
                            variant="warning"
                        >
                            Cancel Offer
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default TradeCard;