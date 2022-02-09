import React from "react";
import Card from "react-bootstrap/Card"
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

function PlantCard({name, img, phase, petSafe, careInstructions}) {
    return (
        <div>
            <Card 
                style={{ width: '18rem' }}
                className="card border-success m-2"
            >
                
                <Card.Body
                    className="card-body text-success"
                >
                    <Card.Title>{name}</Card.Title>
                    <Card.Img 
                        variant="top"
                        src={img}
                    />
                    <Card.Text className="mt-2">
                        Care instructions: {careInstructions}
                    </Card.Text>
                </Card.Body>
                <ListGroup 
                    className="list-group-flush"
                >
                    <ListGroupItem>Phase of growth: {phase}</ListGroupItem>
                    <ListGroupItem>Pet safe? {petSafe}</ListGroupItem>
                </ListGroup>
                <Card.Footer
                    className="card-footer"
                >
                    <Card.Link href="#">More info</Card.Link>
                    <Card.Link href="#">More from user</Card.Link>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default PlantCard